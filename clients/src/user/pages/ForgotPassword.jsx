import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { useForgotPassword } from "../../hooks/useAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    forgotPassword(
      { email },
      {
        onSuccess: () => setSubmitted(true),
      },
    );
  };

  return (
    <>
      <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(59,130,246,0.18); }
      70%  { box-shadow: 0 0 0 14px rgba(59,130,246,0); }
      100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
    }
  `}</style>

      <div className="h-screen bg-[#f5f7fa] flex items-center justify-center px-4 pt-16">
        {/* Subtle radial glow behind card */}
        <div
          className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          className="relative w-full max-w-md"
          style={{ animation: "fadeInUp 0.5s ease-out both" }}
        >
          {/* Card */}
          <div className="bg-white border border-[#CBD5E1] rounded-2xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            {/* Back link */}
            <button
              onClick={() => navigate("/auth")}
              className="flex items-center gap-1.5 text-[#64748B] hover:text-[#2563EB] text-sm mb-8 transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              Back to Login
            </button>

            {!submitted ? (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-16 h-16 rounded-full bg-[#DBEAFE] border border-[#BFDBFE] flex items-center justify-center"
                    style={{ animation: "pulse-ring 2.5s ease-out infinite" }}
                  >
                    <Mail className="w-7 h-7 text-[#2563EB]" />
                  </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                  <p className="text-[#2563EB] text-xs font-semibold tracking-widest uppercase mb-2">
                    Account Recovery
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                    Forgot Password?
                  </h1>
                  <p className="text-[#64748B] text-sm mt-2 leading-relaxed">
                    Enter the email linked to your Embrodivine account and we'll
                    send you a reset link.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-[#2563EB] text-xs font-semibold uppercase tracking-wider block mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#DBEAFE] transition-all text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPending || !email}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:scale-[0.98]"
                  >
                    {isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Reset Link
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                  <span className="text-[#94A3B8] text-xs">or</span>
                  <div className="flex-1 h-px bg-[#E2E8F0]" />
                </div>

                <p className="text-center text-sm text-[#64748B]">
                  Remember your password?{" "}
                  <button
                    onClick={() => navigate("/auth")}
                    className="text-[#2563EB] font-semibold hover:text-[#1D4ED8] transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </>
            ) : (
              /* ── Success state ── */
              <div
                className="text-center py-4"
                style={{ animation: "fadeInUp 0.4s ease-out both" }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#DBEAFE] border border-[#2563EB] flex items-center justify-center">
                    <Send className="w-7 h-7 text-[#2563EB]" />
                  </div>
                </div>

                <p className="text-[#2563EB] text-xs font-semibold tracking-widest uppercase mb-2">
                  Email Sent
                </p>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-3">
                  Check your inbox
                </h2>
                <p className="text-[#64748B] text-sm leading-relaxed mb-2">
                  We've sent a password reset link to
                </p>
                <p className="text-[#2563EB] font-semibold text-sm mb-7 break-all">
                  {email}
                </p>
                <p className="text-[#64748B] text-xs mb-8">
                  Didn't receive it? Check your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#2563EB] hover:text-[#1D4ED8] underline transition-colors"
                  >
                    try again
                  </button>
                  .
                </p>

                <button
                  onClick={() => navigate("/auth")}
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-200"
                >
                  Back to Login
                </button>
              </div>
            )}
          </div>

          {/* Brand footer */}
          <p className="text-center text-[#64748B] text-xs mt-6 tracking-wider">
            EMBRODIVINE · Embroidery Digitizing Services
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
