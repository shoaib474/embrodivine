import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ShoppingCart,
  X,
  ArrowRight,
  Lock,
  CreditCard,
  AlertTriangle,
  Plus,
} from "lucide-react";

import {
  useCart,
  useMoveToCart,
  useRemoveFromCart,
  useRemoveSavedItem,
  useSavedItems,
  useSaveForLater,
} from "../../hooks/useCart";

import CartSkeleton from "../components/CartSkeleton";

const Cart = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCart();
  const { data: savedItemsData, isLoading: isSavedItemsLoading } =
    useSavedItems();    

  const { mutate: removeItem } = useRemoveFromCart();
  const { mutate: removeSavedItem } = useRemoveSavedItem();
  const { mutate: saveForLater } = useSaveForLater();
  const { mutate: moveToCart } = useMoveToCart();

  // 🛒 CART ITEMS
  const cartItems =
    data?.products
      ?.filter((p) => p?.productId)
      ?.map((p) => ({
        id: p.productId._id,
        name: p.productId.name,
        price: p.productId.price,
        qty: p.qty,
        image: p.productId.image?.url || p.productId.image || "",
        description: p.productId.description || "",
      })) || [];

  // 💾 SAVED ITEMS (FROM SEPARATE API)
  const savedItems =
    savedItemsData?.savedItems?.map((p) => ({
      id: p.productId?._id,
      name: p.productId?.name,
      price: p.productId?.price,
      qty: p.qty,
      image: p.productId?.image?.url || p.productId?.image || "",
      description: p.productId?.description || "",
    })) || [];

  // REMOVE ITEM
  const handleRemove = (id) => {
    removeItem(id);
  };

  // REMOVE SAVED ITEM
  const handleRemoveSaved = (id) => {
    removeSavedItem(id);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    navigate("/checkout");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const benefits = [
    {
      icon: AlertTriangle,
      text: "Digital Download Only — no physical item will be shipped.",
    },
  ];

  if (isError) return <div>Error loading cart.</div>;

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="w-24 h-24 bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto">
            <ShoppingCart className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-4xl font-bold text-[#E8D7B5]">
            Your Cart is Empty
          </h2>
          <p className="text-[#D4AF37]/80 text-lg">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => (window.location.href = "/store")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#D4AF37]/30"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010]">
      <title>Shopping Cart | PatchShop</title>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#101010] via-[#1A1A1A] to-[#101010] border-b border-[#D4AF37]/20 pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
            {/* Left Section: Title & Items */}
            <div className="space-y-2 animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#E8D7B5] drop-shadow-md">
                Shopping Cart
              </h1>
              <p className="text-lg sm:text-xl text-[#D4AF37]/80 font-medium">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>

            {/* Right Section: Secure Checkout */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-[#2A2A2A]/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in">
              <Lock className="w-5 h-5 text-[#D4AF37]" />
              <span className="font-semibold text-[#D4AF37]">
                Secure Checkout
              </span>
            </div>
          </div>

          {/* Optional Subtle Sparkle Animation */}
          <div className="relative mt-10">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="animate-pulse-sparkle absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-[#1A1A1A] border-b border-[#D4AF37]/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[#D4AF37]/80"
                >
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <CartSkeleton key={i} />
                ))}
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#1A1A1A] rounded-xl border border-[#D4AF37]/20 p-4 sm:p-6 hover:border-[#D4AF37] transition-all duration-300"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-[#D4AF37]/20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#E8D7B5] mb-1">
                            {item.name}
                          </h3>
                          <p className="hidden md:flex text-sm text-[#D4AF37]/70 mb-2">
                            Description: {item.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors h-fit"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-auto pt-4">
                        {/* Quantity Controls */}
                        <div className="hidden md:flex items-center">
                          <span className="text-sm text-[#D4AF37]/80 font-medium">
                            Quantity:
                          </span>

                          <span className="min-w-[32px] text-center text-[#E8D7B5] font-semibold bg-[#1A1A1A]">
                            {item.qty}
                          </span>
                        </div>

                        {/* Save for Later */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => saveForLater({ productId: item.id })}
                            className="text-sm text-[#D4AF37] hover:underline font-semibold"
                          >
                            Save for Later
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#D4AF37]">
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                          {item.qty > 1 && (
                            <p className="text-xs text-[#D4AF37]/60">
                              ${item.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Saved for Later */}
            {savedItems.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-[#E8D7B5] mb-4">
                  Saved for Later
                </h2>
                <div className="space-y-4">
                  {isSavedItemsLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <CartSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    savedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#1A1A1A] rounded-xl border border-[#D4AF37]/20 p-4 sm:p-6"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#D4AF37]/20 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-[#E8D7B5]">
                                {item.name}
                              </h3>
                              <p className="text-[#D4AF37] font-semibold">
                                ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  moveToCart({
                                    productId: item.id,
                                    qty: item.qty,
                                  })
                                }
                                className="hidden md:flex px-4 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all"
                              >
                                Move to Cart
                              </button>
                              <button
                                onClick={() =>
                                  moveToCart({
                                    productId: item.id,
                                    qty: item.qty,
                                  })
                                }
                                className="md:hidden px-2 py-1 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all"
                              >
                                <Plus />
                              </button>
                              <button
                                onClick={() => handleRemoveSaved(item.id)}
                                className="p-2 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Summary */}
              <div className="bg-[#1A1A1A] rounded-xl border border-[#D4AF37]/20 p-6">
                <h3 className="text-lg font-bold text-[#E8D7B5] mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-[#D4AF37]/80">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#D4AF37]/80">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-[#D4AF37]/20 pt-3 mt-3">
                    <div className="flex justify-between text-[#E8D7B5] text-xl">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-[#D4AF37]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full mt-6 px-8 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D4AF37]/30 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[#D4AF37]/60 text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Secure SSL Encryption</span>
                </div>
              </div>

              {/* Continue Shopping */}
              <button
                onClick={() => (window.location.href = "/store")}
                className="w-full px-6 py-3 bg-[#101010] border-2 border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
