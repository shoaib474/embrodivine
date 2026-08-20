import React from "react";
import { CheckCircle2 } from "lucide-react";

const OrderSuccess = ({ shippingEmail }) => {
  // If no order number is passed, generate a random one
  const generatedOrderNumber = `#ORD-2024-${Math.floor(Math.random() * 1000)}`;

  return (
    <div className="min-h-screen bg-[#FFFFFF] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto animate-scale-in">
          <CheckCircle2
            className="w-14 h-14 text-[#FFFFFF]"
            strokeWidth={2.5}
          />
        </div>

        <h2 className="text-4xl font-bold text-[#222222]">
          Order Placed Successfully!
        </h2>

        <p className="text-[#333333] text-lg leading-relaxed">
          Thank you for your purchase! Your order has been confirmed and we'll
          send you an email with the tracking details shortly.
        </p>

        <div className="bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl p-6">
          <p className="text-[#222222] mb-2">Order Number</p>
          <p className="text-3xl font-bold text-[#007BFF]">
            {generatedOrderNumber}
          </p>

          {shippingEmail && (
            <p className="text-[#333333] text-sm mt-4">
              A confirmation email has been sent to{" "}
              <span className="text-[#007BFF] font-semibold">
                {shippingEmail}
              </span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-8 py-4 bg-[#007BFF] text-[#FFFFFF] rounded-lg font-bold hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#007BFF]/30">
            View Order
          </button>

          <button className="px-8 py-4 bg-transparent border-2 border-[#007BFF] text-[#007BFF] rounded-lg font-bold hover:bg-[#007BFF]/10 transition-all duration-300">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
