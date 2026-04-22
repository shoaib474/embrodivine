import React from "react";
import { useForm } from "react-hook-form";
import { CreditCard, Lock } from "lucide-react";

const PaymentForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 sm:p-8 animate-fade-in space-y-4"
    >
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-[#D4AF37]" />
        <h2 className="text-2xl font-bold text-[#E8D7B5]">
          Payment Information
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
            Card Number *
          </label>
          <input
            type="text"
            maxLength={19}
            placeholder="1234 5678 9012 3456"
            {...register("cardNumber", { required: "Card number is required" })}
            className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
              errors.cardNumber ? "border-red-500" : "border-[#D4AF37]/30"
            }`}
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cardNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
            Cardholder Name *
          </label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("cardName", {
              required: "Cardholder name is required",
            })}
            className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
              errors.cardName ? "border-red-500" : "border-[#D4AF37]/30"
            }`}
          />
          {errors.cardName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cardName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
              Expiry Date *
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              data-testid="expiry-input"
              data-cy="expiry-input"
              {...register("expiry", { required: "Expiry date is required" })}
              className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                errors.expiry ? "border-red-500" : "border-[#D4AF37]/30"
              }`}
            />
            {errors.expiry && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expiry.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
              CVV *
            </label>
            <input
              type="text"
              placeholder="123"
              {...register("cvv", { required: "CVV is required" })}
              className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                errors.cvv ? "border-red-500" : "border-[#D4AF37]/30"
              }`}
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[#E8D7B5] font-semibold text-sm mb-1">
                Secure Payment
              </p>
              <p className="text-[#D4AF37]/70 text-xs">
                Your payment information is encrypted and secure. We never store
                your card details.
              </p>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-8 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold text-lg hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#D4AF37]/30"
        >
          Pay Now
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
