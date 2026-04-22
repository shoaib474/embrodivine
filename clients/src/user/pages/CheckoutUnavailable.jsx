import React, { useState } from "react";
import { Mail, Info, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const CheckoutUnavailable = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/notify`,
        { email },
        { withCredentials: true }
      );

      if (res.data.success) {
        setSubmitted(true);
        setEmail("");

        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setAlreadyRegistered(true);

        setTimeout(() => {
          setAlreadyRegistered(false);
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#101010] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#111] border border-[#D4AF37]/30 rounded-2xl p-6 text-center shadow-lg">
        {/* ================= FORM ================= */}
        {!submitted && !alreadyRegistered && (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-[#D4AF37]/10 p-3 rounded-full">
                <Info className="text-[#D4AF37]" size={28} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#E8D7B5] mb-2">
              Checkout Is Currently Unavailable
            </h2>

            <p className="text-[#D4AF37]/80 text-sm mb-6">
              Online checkout is temporarily unavailable. Please leave your
              email address and we will contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-2 rounded-xl bg-[#0b0b0b] border border-[#D4AF37]/30 text-[#E8D7B5] placeholder:text-[#D4AF37]/50 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  "Notify Me"
                )}
              </button>
            </form>

            <div className="mt-4 text-xs text-[#D4AF37]/60 flex items-center justify-center gap-1">
              <Mail size={14} />
              <span>We respect your privacy. No spam.</span>
            </div>
          </>
        )}

        {/* ================= SUCCESS ================= */}
        {submitted && (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-green-500/10 p-3 rounded-full">
                <CheckCircle className="text-green-500" size={28} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#E8D7B5] mb-2">
              Thank You!
            </h2>

            <p className="text-[#D4AF37]/80 text-sm">
              We've received your email. We'll notify you as soon as checkout is
              available.
            </p>
          </>
        )}

        {/* ================= ALREADY REGISTERED ================= */}
        {alreadyRegistered && (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-yellow-500/10 p-3 rounded-full">
                <AlertCircle className="text-yellow-500" size={28} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#E8D7B5] mb-2">
              Already Registered
            </h2>

            <p className="text-[#D4AF37]/80 text-sm">
              This email address is already registered. We’ll notify you as soon
              as checkout becomes available.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutUnavailable;
