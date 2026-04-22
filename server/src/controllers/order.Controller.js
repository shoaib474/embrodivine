import crypto from "crypto";
import getAccessToken from "../utils/paypal.js";
import PDFDocument from "pdfkit";

import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";

const PAYPAL_BASE_URL =
  process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com";

const generateOrderId = () => {
  const year = new Date().getFullYear();
  const randomHex = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `ORD-${year}-${randomHex}`;
};

// 🔹 Create Order (after PayPal payment)
export const createOrder = async (req, res) => {
  try {
    const { amount, cartItems, customer } = req.body;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const accessToken = await getAccessToken();

    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: Number(amount).toFixed(2),
            },
          },
        ],
      }),
    });

    const text = await response.text(); // 👈 SAFE FIRST

    console.log("PayPal Raw Response:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error("Invalid JSON from PayPal: " + text);
    }

    if (!response.ok) {
      throw new Error(
        data?.message || data?.error || "PayPal create order failed",
      );
    }

    let customOrderId;
    let exists = true;

    while (exists) {
      customOrderId = generateOrderId();
      exists = await Order.findOne({ orderId: customOrderId });
    }

    const newOrder = await Order.create({
      user: req.user.id,
      paypalOrderId: data.id,
      orderId: customOrderId,
      amount: amount,
      items: cartItems,
      customer,
      status: "pending",
      downloadable: false,
    });

    return res.json({ id: data.id, orderId: newOrder.orderId });
  } catch (err) {
    console.error("Create Order Error:", err.message);
    res.status(500).json({ error: "PayPal order creation failed" });
  }
};

export const captureOrder = async (req, res) => {
  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: "orderID is required" });
    }

    const accessToken = await getAccessToken();

    const response = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      if (data) {
        order.status = "cancelled";
      }
    }

    if (data.status !== "COMPLETED") {
      return res
        .status(400)
        .json({ error: "Payment not completed", details: data });
    }

    // ✅ Yahan DB mein order save karo
    const updatedOrder = await Order.findOneAndUpdate(
      { paypalOrderId: orderID },
      { status: "paid", downloadable: true },
      { new: true },
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found in DB" });
    }
    res.json({ success: true, data });
  } catch (err) {
    console.error("Capture Order Error:", err.message);
    res.status(500).json({ error: "Payment capture failed" });
  }
};

// 🔹 Get Logged-in User's Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};

// 🔹 Get Single Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("user", "name email")
      .populate("products.product", "name price image");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ User apna hi order dekh sake, admin sab
    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("getOrderById error:", error);
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// 🔹 Get All Orders — Admin Only
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// 🔹 Update Order Status — Admin Only
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // ✅ Complete status lifecycle
    const validStatuses = ["pending", "paid", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status, updatedAt: Date.now() },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("updateOrderStatus error:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};

// 🔹 Delete Order — Admin Only
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" }); 
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("deleteOrder error:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

export const downloadInvoicec = async (req, res) => {
  try {
    const { orderId } = req.params;

    // 🔎 1. Order DB se fetch karo
    const order = await Order.findById(orderId).populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🧾 2. Response headers (PDF download)
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`,
    );

    // 📄 3. PDF create
    const doc = new PDFDocument({ margin: 40 });

    doc.pipe(res);

    // 🏷️ Header
    doc.fontSize(20).text("INVOICE", { align: "center" });
    doc.moveDown();

    // 🧑 Customer Info
    doc.fontSize(12).text(`Order ID: ${order._id}`);
    doc.text(`Customer: ${order.user?.name || "N/A"}`);
    doc.text(`Email: ${order.user?.email || "N/A"}`);
    doc.moveDown();

    // 📦 Items
    doc.fontSize(14).text("Items:", { underline: true });
    doc.moveDown(0.5);

    order.items.forEach((item, index) => {
      doc
        .fontSize(12)
        .text(
          `${index + 1}. ${item.name} | Qty: ${item.quantity} | Price: ${item.price}`,
        );
    });

    doc.moveDown();

    // 💰 Total
    doc.fontSize(14).text(`Total Amount: ${order.amount} PKR`, {
      bold: true,
    });

    doc.moveDown();

    // 🙏 Footer
    doc.fontSize(10).text("Thank you for your purchase!", {
      align: "center",
    });

    doc.end();
  } catch (error) {
    console.error("Invoice Error:", error);
    res.status(500).json({ message: "Failed to generate invoice" });
  }
};

export const downloadInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 📄 headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order.orderId}.pdf`,
    );

    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(res);

    // 🏷️ HEADER (Company Info)
    doc
      .fontSize(18)
      .text("EMBROIDIVINE", { align: "left" })
      .fontSize(10)
      .text("Your Partner in Embroidery")
      .text("support@embroidivine.com")
      .moveUp(3)
      .fontSize(20)
      .text("INVOICE", { align: "right" })
      .fontSize(10)
      .text(`#${order.orderId}`, { align: "right" });

    doc.moveDown(2);

    // 📅 Invoice Info
    doc.fontSize(10);
    doc.text(`Invoice Date: ${new Date().toDateString()}`);
    doc.text(`Status: ${order.status || "Processing"}`);
    doc.text(`Payment Method: ${order.paymentMethod || "PayPal"}`);

    doc.moveDown();

    // 👤 BILL TO
    doc.text("BILL TO:");
    doc.text(order.user?.name || "N/A");
    doc.text(order.user?.email || "N/A");

    doc.moveDown();

    // 📦 TABLE HEADER
    doc
      .fontSize(12)
      .text("Item", 40, doc.y, { bold: true })
      .text("Qty", 250, doc.y)
      .text("Price", 300, doc.y)
      .text("Total", 400, doc.y);

    doc.moveDown();

    // 📦 ITEMS
    order.items.forEach((item) => {
      doc
        .fontSize(10)
        .text(item.name, 40, doc.y)
        .text(item.quantity, 250, doc.y)
        .text(`${item.price} PKR`, 300, doc.y)
        .text(`${item.price * item.quantity} PKR`, 400, doc.y);

      doc.moveDown();
    });

    doc.moveDown();

    // 💰 TOTALS
    doc.text(`Subtotal: ${order.amount} PKR`, { align: "right" });
    doc.text("Shipping: Included", { align: "right" });
    doc.text("Tax: 0 PKR", { align: "right" });

    doc.fontSize(14).text(`TOTAL: ${order.amount} PKR`, { align: "right" });

    doc.moveDown(2);

    // 📝 NOTES
    doc
      .fontSize(10)
      .text("Terms & Notes:")
      .text("• All sales are final once production has begun.")
      .text("• Custom files remain property of client.")
      .text("• Colors may vary slightly.")
      .text("• Contact within 48 hours for issues.");

    doc.moveDown();

    doc.text("Thank you for choosing Embroidivine!", {
      align: "center",
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Invoice error" });
  }
};
