import express from "express";
import authVerification from "../middleware/auth.middleware.js";
import getAccessToken from "../utils/paypal.js";

import Order from "../models/Order.model.js";

const router = express.Router();

const PAYPAL_BASE_URL =
  process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com";

// ✅ Create Order
router.post("/create-order", authVerification, async (req, res) => {
  try {
    
    console.log("REQ.USER 👉", req.user);
    const { amount, cartItems } = req.body;
    console.log("user", cartItems);

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

    const newOrder = await Order.create({
      user: req.user.id, 
      paypalOrderId: data.id,
      amount: amount,
      items: cartItems,
      status: "pending",
      downloadable: false,
    });

    return res.json({ id: data.id });
  } catch (err) {
    console.error("Create Order Error:", err.message);
    res.status(500).json({ error: "PayPal order creation failed" });
  }
});

// ✅ Capture Payment
router.post("/capture-order", async (req, res) => {
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
});

export default router;
