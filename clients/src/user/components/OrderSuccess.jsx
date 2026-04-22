import React from "react";
import { CheckCircle2 } from "lucide-react";

const OrderSuccess = ({ shippingEmail }) => {
  // If no order number is passed, generate a random one
  const generatedOrderNumber = `#ORD-2024-${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto animate-scale-in">
          <CheckCircle2 className="w-14 h-14 text-[#101010]" strokeWidth={2.5} />
        </div>

        <h2 className="text-4xl font-bold text-[#E8D7B5]">
          Order Placed Successfully!
        </h2>

        <p className="text-[#D4AF37]/80 text-lg leading-relaxed">
          Thank you for your purchase! Your order has been confirmed and we'll
          send you an email with the tracking details shortly.
        </p>

        <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6">
          <p className="text-[#E8D7B5] mb-2">Order Number</p>
          <p className="text-3xl font-bold text-[#D4AF37]">{generatedOrderNumber}</p>
          {shippingEmail && (
            <p className="text-[#D4AF37]/60 text-sm mt-4">
              A confirmation email has been sent to{" "}
              <span className="text-[#D4AF37] font-semibold">{shippingEmail}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-8 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#D4AF37]/30">
            View Order
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all duration-300">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
