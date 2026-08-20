import React, { useState } from "react";
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
import { useValidateCoupon } from "../../hooks/useCoupon";

const Payment = () => {
  const { data, isLoading, isError } = useCart();
  const { checkoutData } = useCheckout();
  const { mutate, isPending } = useValidateCoupon();

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [savedCard, setSavedCard] = useState(null);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [couponType, setCouponType] = useState(null);

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

  let discount = 0;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (couponType === "percentage") {
    discount = (cartTotal * appliedPromo.discount) / 100;
  } else if (couponType === "fixed") {
    discount = appliedPromo.discount;
  }

  const total = subtotal - discount;

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
    mutate(
      {
        code: promoCode.trim().toUpperCase(),
        cartTotal: subtotal,
      },
      {
        onSuccess: (data) => {
          setAppliedPromo({
            code: promoCode,
            discount: data.data.coupon.value,
          });
          setCouponType(data.data.coupon.type);
          setPromoError("");
        },

        onError: (error) => {
          toast.error(error.response?.data?.message || "Invalid promo code");
          setPromoError(error.response?.data?.message || "Invalid promo code");
        },
      },
    );
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
    <div className="min-h-screen bg-[#F5F7FA] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pt-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#222222] mb-2">
            Payment Details
          </h1>
          <p className="text-[#007BFF]/70">Complete your purchase</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment & Shipping */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method */}
            <div className="bg-white border border-[#007BFF]/20 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#222222] mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#007BFF]" />
                Payment Method
              </h2>

              {paymentMethod === "paypal" && (
                <div className="text-center py-8">
                  <div className="mt-6 md:mx-8">
                    <PayPalButton
                      cartItems={cartItems}
                      amount={total.toFixed(2)}
                      customer={checkoutData}
                      onSuccess={(paymentData) => {
                        handlePaymentSuccess(paymentData);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="flex items-center gap-2 p-3 bg-[#F5F7FA] rounded-lg border border-[#007BFF]/20">
                <Lock className="w-5 h-5 text-green-500" />
                <span className="text-[#333333] text-sm">
                  Your payment information is encrypted and secure
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#007BFF]/20 rounded-xl p-6 sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold text-[#222222] mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#007BFF]" />
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-[#007BFF]/20">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-[#222222] font-semibold text-sm">
                        {item.name}
                      </h4>
                      <p className="text-[#333333] text-xs">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-[#007BFF] font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-[#333333] text-sm mb-2">
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
                        className="flex-1 px-4 py-2 bg-[#F5F7FA] border border-[#007BFF]/30 rounded-lg text-[#222222] placeholder-[#333333]/50 focus:outline-none focus:border-[#007BFF] transition-colors"
                      />
                      <button
                        onClick={applyPromo}
                        disabled={!promoCode.trim() || isPending}
                        className="px-4 py-2 bg-[#007BFF] text-white rounded-lg font-semibold hover:bg-[#0066CC] transition-all"
                      >
                        {isPending ? "Applying..." : "Apply"}
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
              <div className="space-y-3 mb-6 pb-6 border-b border-[#007BFF]/20">
                <div className="flex items-center justify-between text-[#333333]">
                  <span>Subtotal</span>
                  <span className="text-[#222222]">${subtotal.toFixed(2)}</span>
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
                <span className="text-[#222222] font-bold text-lg">Total</span>
                <span className="text-[#007BFF] font-bold text-2xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
