import Coupon from "../models/Coupon.model.js";

/**
 * CREATE COUPON
 */
export const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET ALL COUPONS
 */
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET SINGLE COUPON
 */
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE COUPON
 */
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE COUPON
 */
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * VALIDATE COUPON
 */
export const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    // CHECK EXIST
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    const now = new Date();

    // CHECK STATUS
    if (coupon.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Coupon is not active",
      });
    }

    // CHECK START DATE
    if (now < coupon.startDate) {
      return res.status(400).json({
        success: false,
        message: "Coupon not started yet",
      });
    }

    // CHECK END DATE
    if (now > coupon.endDate) {
      coupon.status = "expired";
      await coupon.save();

      return res.status(400).json({
        success: false,
        message: "Coupon expired",
      });
    }

    // CHECK USAGE LIMIT
    if (coupon.used >= coupon.usageLimit) {
      coupon.status = "disabled";
      await coupon.save();

      return res.status(400).json({
        success: false,
        message: "Coupon usage limit reached",
      });
    }

    // CHECK MIN PURCHASE
    if (cartTotal < coupon.minPurchase) {
      return res.status(400).json({
        success: false,
        message: `Minimum purchase should be ${coupon.minPurchase}`,
      });
    }

    // CALCULATE DISCOUNT
    let discount = 0;

    if (coupon.type === "percentage") {
      discount = (cartTotal * coupon.value) / 100;

      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
    } else {
      discount = coupon.value;
    }

    // FINAL TOTAL
    const finalAmount = Math.max(cartTotal - discount, 0);

    // ✅ INCREMENT USAGE
    coupon.used += 1;

    // AUTO DISABLE IF LIMIT REACHED
    if (coupon.used >= coupon.usageLimit) {
      coupon.status = "disabled";
    }

    await coupon.save();

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      data: {
        cartTotal,
        discount,
        finalAmount,
        coupon,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};