import Cart from "../models/Cart.model.js";
import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";

export const addToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { productId, qty } = req.body;

    if (!productId || !qty || isNaN(qty) || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid productId and quantity are required",
      });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      cart.products = cart.products.filter((p) => p.productId); // only keep valid entries
    }

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        products: [{ productId, qty }],
      });
    } else {
      const index = cart.products.findIndex(
        (p) => p.productId?.toString() === productId,
      );

      if (index > -1) {
        cart.products[index].qty += qty; // increment
      } else {
        cart.products.push({ productId, qty }); // add new
      }
    }

    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Product added to cart", cart });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "products.productId",
    );

    if (!cart) {
      return res.status(200).json({ success: true, cart: [], count: 0 });
    }

    res.status(200).json({
      success: true,
      products: cart.products,
      count: cart.products.reduce((sum, item) => sum + item.qty, 0),
    });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // FIX 🔥
    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();

    return res.json({
      success: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (err) {
    console.error("Remove Cart Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    cart.products = [];
    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart cleared",
      cart,
    });
  } catch (err) {
    console.error("Clear Cart Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Move a product to Save for Later
export const saveForLater = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID is required" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const index = cart.products.findIndex(
      (p) => p.productId.toString() === productId,
    );
    if (index === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Product not in cart" });
    }

    // Move product to saveForLater
    const item = cart.products[index];
    cart.saveForLater.push(item);

    // Remove from cart
    cart.products.splice(index, 1);

    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Product saved for later", cart });
  } catch (err) {
    console.error("Save for later error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// Move product back from Save for Later to cart
export const moveToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });

    const index = cart.saveForLater.findIndex(
      (p) => p.productId.toString() === productId,
    );
    if (index === -1)
      return res
        .status(400)
        .json({ success: false, message: "Product not in Save for Later" });

    // Move to cart
    const item = cart.saveForLater[index];
    cart.products.push({ productId: item.productId, qty: qty || item.qty });

    // Remove from saveForLater
    cart.saveForLater.splice(index, 1);

    await cart.save();

    res
      .status(200)
      .json({ success: true, message: "Product moved to cart", cart });
  } catch (err) {
    console.error("Move to cart error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// controllers/cart.controller.js
export const getSavedItems = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "saveForLater.productId",
    );

    if (!cart || cart.saveForLater.length === 0) {
      return res.status(200).json({ success: true, savedItems: [] });
    }

    res.status(200).json({ success: true, savedItems: cart.saveForLater });
  } catch (err) {
    console.error("Get saved items error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Remove a product from Save for Later
export const removeSavedItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const initialLength = cart.saveForLater.length;
    cart.saveForLater = cart.saveForLater.filter(
      (item) => item.productId.toString() !== productId,
    );

    if (cart.saveForLater.length === initialLength) {
      return res.status(400).json({
        success: false,
        message: "Product not found in Save for Later",
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from Save for Later",
      savedItems: cart.saveForLater,
    });
  } catch (err) {
    console.error("Remove saved item error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

export const checkoutCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    let totalPrice = 0;
    const orderProducts = [];

    for (const item of cart.products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ success: false, message: "Product not found" });
      }

      orderProducts.push({ product: product._id, qty: item.qty });
      totalPrice += product.price * item.qty;
    }

    const order = await Order.create({
      user: req.user.id,
      products: orderProducts,
      totalPrice,
    });

    // Clear cart
    cart.products = [];
    await cart.save();

    res.status(201).json({
      success: true,
      message: "Checkout successful",
      order: await order.populate("products.product"),
    });
  } catch (err) {
    console.error("Checkout cart error:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
