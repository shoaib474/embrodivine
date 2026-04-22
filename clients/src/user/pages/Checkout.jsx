import React, { useEffect, useState } from "react";
import PayPalButton from "../components/PayPalButton";
import axios from "axios";
import BillingForm from "../components/BillingForm";
import PaymentForm from "../components/PaymentForm";
import OrderSuccess from "../components/OrderSuccess";
import { useCart } from "../../hooks/useCart";
import CartSummarySkeleton from "../components/CartSummarySkeleton";
import { useCheckout } from "../context/CheckoutContext";

const API = import.meta.env.VITE_API_URL;

const Checkout = () => {
  const { data, isLoading, isError } = useCart();
  const { checkoutData, setCheckoutData } = useCheckout();
  const [orderComplete, setOrderComplete] = useState(false);
  const [step, setStep] = useState(1);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const cartItems =
    data?.products?.map((p) => ({
      id: p.productId?._id,
      name: p.productId?.name,
      price: p.productId?.price,
      quantity: p.qty,
      img: p.productId?.image?.url || p.productId?.image,
      description: p.productId?.description,
    })) || [];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  // Handle billing form submit
  const handleBillingSubmit = (data) => {
    setCheckoutData(data);
    setStep(2); // Show payment form
  };

  return (
    <div className="min-h-screen bg-[#101010] pt-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing & Payment Forms */}
          <div className="lg:col-span-2 space-y-6">
            <BillingForm
              onSubmit={handleBillingSubmit}
              initialData={checkoutData}
            />
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#E8D7B5] mb-4">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  {isLoading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <CartSummarySkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border border-[#D4AF37]/20"
                        />
                        <div className="flex-1">
                          <p className="text-[#E8D7B5] font-semibold text-sm">
                            {item.name}
                          </p>
                          <p className="text-[#D4AF37]/70 text-xs">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-[#D4AF37] font-bold text-sm">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="border-t border-[#D4AF37]/20 pt-4 space-y-3">
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
                  <div className="flex justify-between text-[#E8D7B5] font-bold text-lg mt-3 border-t border-[#D4AF37]/20 pt-3">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
