import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Pakistan",
  "India",
  // add more countries as needed
];

const BillingForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
    }
    setIsSubmitted(true); // button hide ho jaye
    navigate("/checkout/payment");
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 sm:p-8 animate-fade-in space-y-4"
      >
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-6 h-6 text-[#D4AF37]" />
          <h2 className="text-2xl font-bold text-[#E8D7B5]">Billing details</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
              Full Name *
            </label>
            <input
              type="text"
              {...register("name", { required: "First name is required" })}
              className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                errors.name ? "border-red-500" : "border-[#D4AF37]/30"
              }`}
              placeholder="John"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

        
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
              Email Address *
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                errors.email ? "border-red-500" : "border-[#D4AF37]/30"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
              Phone Number *
            </label>
            <input
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                errors.phone ? "border-red-500" : "border-[#D4AF37]/30"
              }`}
              placeholder="+1 (555) 000-0000"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
            Street Address *
          </label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
              errors.address ? "border-red-500" : "border-[#D4AF37]/30"
            }`}
            placeholder="123 Main Street"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
              City *
            </label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                errors.city ? "border-red-500" : "border-[#D4AF37]/30"
              }`}
              placeholder="New York"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
              State *
            </label>
            <input
              type="text"
              {...register("state", { required: "State is required" })}
              className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                errors.state ? "border-red-500" : "border-[#D4AF37]/30"
              }`}
              placeholder="NY"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
              ZIP Code *
            </label>
            <input
              type="text"
              {...register("zipCode", { required: "ZIP Code is required" })}
              className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
                errors.zipCode ? "border-red-500" : "border-[#D4AF37]/30"
              }`}
              placeholder="10001"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-[#E8D7B5] font-semibold mb-2 text-sm">
            Country *
          </label>
          <select
            {...register("country", { required: "Country is required" })}
            className={`w-full px-4 py-3 bg-[#101010] border rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors ${
              errors.country ? "border-red-500" : "border-[#D4AF37]/30"
            }`}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">
              Please fix the following errors:
            </strong>
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-8 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold text-lg hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#D4AF37]/30"
        >
          {isSubmitted ? "Processing..." : "Continue To Payment"}
        </button>
      </form>
    </div>
  );
};

export default BillingForm;
