import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MailCheck, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";
import { useVerifyEmail } from "../../hooks/useAuth";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "error"
  const [countdown, setCountdown] = useState(3);

  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    verifyEmail(token, {
      onSuccess: () => {
        setStatus("success");
      },
      onError: () => {
        setStatus("error");
      },
    });
  }, [token]);

  // Countdown redirect on success
  useEffect(() => {
    if (status !== "success") return;
    if (countdown === 0) {
      navigate("/dashboard");
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [status, countdown, navigate]);

  return (
    <>
      <style>{`
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(59,130,246,0.35); }
      70%  { box-shadow: 0 0 0 16px rgba(59,130,246,0); }
      100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
    }
    @keyframes success-ring {
      0%   { box-shadow: 0 0 0 0 rgba(74,222,128,0.3); }
      70%  { box-shadow: 0 0 0 16px rgba(74,222,128,0); }
      100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes countdown-shrink {
      from { width: 100%; }
      to   { width: 0%; }
    }
  `}</style>

      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4">
        {/* Background glow */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background:
              status === "success"
                ? "radial-gradient(circle, rgba(74,222,128,0.06) 0%, transparent 70%)"
                : status === "error"
                  ? "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          className="relative w-full max-w-md"
          style={{ animation: "fadeInUp 0.5s ease-out both" }}
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-xl text-center">
            {/* ── Verifying ── */}
            {status === "verifying" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out both" }}>
                {/* Spinning icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center"
                    style={{ animation: "pulse-ring 2s ease-out infinite" }}
                  >
                    <Loader2
                      className="w-9 h-9 text-blue-600"
                      style={{ animation: "spin-slow 1s linear infinite" }}
                    />
                  </div>
                </div>

                <p className="text-blue-600 text-xs font-semibold tracking-widest uppercase mb-2">
                  Please Wait
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Verifying Your Email
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We're confirming your email address. This only takes a moment…
                </p>

                {/* Animated dots */}
                <div className="flex justify-center gap-1.5 mt-6">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-blue-300"
                      style={{
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* ── Success ── */}
            {status === "success" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out both" }}>
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full bg-green-50 border border-green-200 flex items-center justify-center"
                    style={{ animation: "success-ring 2s ease-out infinite" }}
                  >
                    <ShieldCheck className="w-9 h-9 text-green-500" />
                  </div>
                </div>

                <p className="text-green-500 text-xs font-semibold tracking-widest uppercase mb-2">
                  Verified
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Email Confirmed!
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Your Embrodivine account is now active. Welcome aboard —
                  you'll be redirected to your dashboard shortly.
                </p>

                {/* Countdown */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 mb-6">
                  <p className="text-gray-600 text-xs mb-2">
                    Redirecting in{" "}
                    <span className="text-blue-600 font-bold text-sm">
                      {countdown}s
                    </span>
                  </p>

                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        animation: `countdown-shrink 3s linear forwards`,
                        width: "100%",
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <MailCheck className="w-4 h-4" />
                  Go to Dashboard Now
                </button>
              </div>
            )}

            {/* ── Error ── */}
            {status === "error" && (
              <div style={{ animation: "fadeInUp 0.4s ease-out both" }}>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-red-50 border border-red-200 flex items-center justify-center">
                    <AlertCircle className="w-9 h-9 text-red-500" />
                  </div>
                </div>

                <p className="text-red-500 text-xs font-semibold tracking-widest uppercase mb-2">
                  Verification Failed
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Link Expired or Invalid
                </h1>
                <p className="text-gray-600 text-sm leading-relaxed mb-7">
                  This verification link may have expired or already been used.
                  Please request a new one from the login page.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-3 rounded-xl font-semibold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 active:scale-[0.98]"
                  >
                    Back to Login
                  </button>
                  <button
                    onClick={() => navigate("/forgot-password")}
                    className="w-full py-3 rounded-xl font-semibold text-sm bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200"
                  >
                    Resend Verification Email
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Brand footer */}
          <p className="text-center text-gray-400 text-xs mt-6 tracking-wider">
            EMBRODIVINE · Embroidery Digitizing Services
          </p>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
