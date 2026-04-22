import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  CreditCard,
  Lock,
  Check,
  ChevronRight,
  ShoppingBag,
  Trash2,
  Plus,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
  Package,
  Truck,
  DollarSign,
  Tag,
  Gift,
  AlertCircle,
  X,
  Edit,
} from "lucide-react";

import PayPalButton from "../components/PayPalButton";

import { useCart } from "../../hooks/useCart";
import { useCheckout } from "../context/CheckoutContext";

const Payment = () => {
  const { data, isLoading, isError } = useCart();
const { checkoutData } = useCheckout();

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [savedCard, setSavedCard] = useState(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Embroidery Street",
    city: "Los Angeles",
    state: "California",
    zipCode: "90001",
    country: "United States",
  });

  const cartItems =
    data?.products?.map((p) => ({
      id: p.productId?._id,
      name: p.productId?.name,
      price: p.productId?.price,
      quantity: p.qty,
      image: p.productId?.image?.url || p.productId?.image,
      description: p.productId?.description,
      downloadUrl: p.productId?.zipUrl || null,
    })) || [];

  const savedCards = [
    {
      id: 1,
      type: "Visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8888",
      expiry: "08/26",
      isDefault: false,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentSuccess = async (paymentData) => {
    try {
      // ✅ DB mein order save karo
      await axios.post(`${API}/api/orders`, {
        items: cartItems,
        total,
        paypalOrderId: paymentData.data.id,
        status: "paid",
      });

      toast.success("Order placed! 🎉");
      // ✅ Cart clear karo (Redux dispatch ya context)
      // dispatch(clearCart());
      navigate("/order-success");
    } catch (err) {
      toast.error("Order saving failed. Contact support.");
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setFormData((prev) => ({ ...prev, expiryDate: value }));
  };

  const applyPromo = async () => {
    try {
      const res = await axios.post(`${API}/api/promo/verify`, {
        code: promoCode.trim().toUpperCase(),
      });
      setAppliedPromo(res.data); // { code, discount }
      setPromoError("");
    } catch (err) {
      setAppliedPromo(null);
      setPromoError("Invalid promo code");
    }
  };

  const handlePlaceOrder = () => {
    // ✅ Basic validation
    if (paymentMethod === "card") {
      if (
        !formData.cardNumber ||
        !formData.cardName ||
        !formData.expiryDate ||
        !formData.cvv
      ) {
        toast.error("Please fill all card details");
        return;
      }
      // Stripe integration yahan aayegi
      toast.error("Card payment coming soon — please use PayPal");
      return;
    }
  };

  return (
    <div className="min-h-screen bg-[#101010] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-2">
            Payment Details
          </h1>
          <p className="text-[#D4AF37]/70">Complete your purchase</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment & Shipping */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-[#E8D7B5] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                Payment Method
              </h2>

              {/* Payment Method Tabs */}
              {/* <div className="flex gap-2 mb-6">
                {[
                  // { id: "card", label: "Credit Card", icon: CreditCard },
                  { id: "paypal", label: "PayPal", icon: DollarSign },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        paymentMethod === method.id
                          ? "bg-[#D4AF37] text-[#101010]"
                          : "bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {method.label}
                    </button>
                  );
                })}
              </div> */}
              {/* 
              {paymentMethod === "card" && (
                <>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[#D4AF37]/70 text-sm mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="w-full pl-11 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#D4AF37]/70 text-sm mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#D4AF37]/70 text-sm mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[#D4AF37]/70 text-sm mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="4"
                          className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setShowNewCardForm(false)}
                      className="text-[#D4AF37] text-sm hover:text-[#E8D7B5] transition-colors"
                    >
                      Use saved card instead
                    </button>
                  </div>
                </>
              )} */}

              {paymentMethod === "paypal" && (
                <div className="text-center py-8">
                  <div className="mt-6 md:mx-8">
                    <PayPalButton
                      cartItems={cartItems} // ✅ cart items pass karo
                      amount={total.toFixed(2)} // ✅ already calculated hai
                      customer={checkoutData}
                      onSuccess={(paymentData) => {
                        handlePaymentSuccess(paymentData);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-center gap-2 p-3 bg-[#101010] rounded-lg border border-[#D4AF37]/20">
                <Lock className="w-5 h-5 text-green-500" />
                <span className="text-[#D4AF37]/70 text-sm">
                  Your payment information is encrypted and secure
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-[#E8D7B5] mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-[#D4AF37]/20">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-[#E8D7B5] font-semibold text-sm">
                        {item.name}
                      </h4>
                      <p className="text-[#D4AF37]/70 text-xs">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-[#D4AF37] font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-[#D4AF37]/70 text-sm mb-2">
                  Promo Code
                </label>
                {!appliedPromo && (
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 px-4 py-2 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      />
                      <button
                        onClick={applyPromo}
                        className="px-4 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-red-500 text-xs mt-2">{promoError}</p>
                    )}
                  </div>
                )}
                {appliedPromo && (
                  <div className="mt-2 flex items-center gap-2 text-green-500 text-sm">
                    <Check className="w-4 h-4" />
                    Promo code applied!
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pb-6 border-b border-[#D4AF37]/20">
                <div className="flex items-center justify-between text-[#D4AF37]/70">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[#D4AF37]/70">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-green-500">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[#E8D7B5] font-bold text-lg">Total</span>
                <span className="text-[#D4AF37] font-bold text-2xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
