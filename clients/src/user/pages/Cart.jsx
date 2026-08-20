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
import CartHero from "../sections/cart/CartHero";
import CartBenefitBar from "../sections/cart/CartBenefitBar";

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

  if (isError) return <div>Error loading cart.</div>;

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="w-24 h-24 bg-white border-2 border-[#007BFF]/20 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <ShoppingCart className="w-12 h-12 text-[#007BFF]" />
          </div>

          <h2 className="text-4xl font-bold text-[#222222]">
            Your Cart is Empty
          </h2>

          <p className="text-[#666666] text-lg">
            Looks like you haven't added anything to your cart yet.
          </p>

          <button
            onClick={() => (window.location.href = "/store")}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#007BFF] text-white rounded-lg font-bold hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#007BFF]/20"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <title>Shopping Cart | PatchShop</title>

      {/* Hero Section */}
      <CartHero cartItems={cartItems} />

      {/* Benefits Bar */}
      <CartBenefitBar />

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
                  key={item.id || item._id || idx}
                  className="bg-white rounded-xl border border-[#007BFF]/10 p-4 sm:p-6 hover:border-[#007BFF] transition-all duration-300 shadow-sm"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-[#007BFF]/10 flex-shrink-0">
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
                          <h3 className="text-lg font-bold text-[#222222] mb-1">
                            {item.name || "Unnamed Product"}
                          </h3>

                          {/* Quantity Controls */}
                          <div className="hidden md:flex items-center">
                            <span className="text-sm text-[#666666] font-medium">
                              Quantity:
                            </span>

                            <span className="min-w-[32px] text-center text-[#222222] font-semibold bg-white">
                              {item.qty || 0}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500/60 hover:text-red-500 transition-colors h-fit"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between mt-auto pt-4">
                        {/* Price */}
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#222222]">
                            ${(item.price * (item.qty || 0)).toFixed(2)}
                          </p>
                        </div>

                        {/* Save for Later */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => saveForLater({ productId: item.id })}
                            className="text-sm text-[#007BFF] hover:underline font-semibold"
                          >
                            Save for Later
                          </button>
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
                <h2 className="text-2xl font-bold text-[#222222] mb-4">
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
                        className="bg-white rounded-xl border border-[#007BFF]/10 p-4 sm:p-6 shadow-sm"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-[#007BFF]/10 flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name || "Unnamed Product"}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-bold text-[#222222]">
                                {item.name}
                              </h3>

                              <p className="text-[#007BFF] font-semibold">
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
                                className="hidden md:flex px-4 py-2 bg-[#007BFF] text-white rounded-lg font-semibold hover:bg-[#0066CC] transition-all"
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
                                className="md:hidden px-2 py-1 bg-[#007BFF] text-white rounded-lg font-semibold hover:bg-[#0066CC] transition-all"
                              >
                                <Plus />
                              </button>

                              <button
                                onClick={() => handleRemoveSaved(item.id)}
                                className="p-2 text-red-500/60 hover:text-red-500 transition-colors"
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
              <div className="bg-white rounded-xl border border-[#007BFF]/10 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#222222] mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#666666]">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-[#007BFF]/10 pt-3 mt-3">
                    <div className="flex justify-between text-[#222222] text-xl">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-[#007BFF]">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className="w-full mt-6 px-8 py-4 bg-[#007BFF] text-white rounded-lg font-bold hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#007BFF]/20 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[#666666] text-sm">
                  <Lock className="w-4 h-4 text-[#007BFF]" />
                  <span>Secure SSL Encryption</span>
                </div>
              </div>

              {/* Continue Shopping */}
              <button
                onClick={() => (window.location.href = "/store")}
                className="w-full px-6 py-3 bg-white border-2 border-[#007BFF]/20 text-[#007BFF] rounded-lg font-semibold hover:bg-[#007BFF]/5 hover:border-[#007BFF] transition-all duration-300 flex items-center justify-center gap-2"
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
