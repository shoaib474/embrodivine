import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { KeyRound, Eye, EyeOff, ArrowLeft, ShieldCheck } from "lucide-react";
import { useResetPassword } from "../../hooks/useAuth";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const { mutate: resetPassword, isPending } = useResetPassword();

  // ── Password strength ──────────────────────────────────────────────────────
  const checks = [
    { label: "At least 8 characters", pass: password.length >= 8 },
    { label: "One uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "One number", pass: /[0-9]/.test(password) },
  ];
  const strength = checks.filter((c) => c.pass).length; // 0–3
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength];
  const strengthColor = ["", "#EF4444", "#F59E0B", "#22C55E"][strength];

  const passwordsMatch = confirm.length > 0 && password === confirm;
  const canSubmit = !isPending && password && passwordsMatch && strength === 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    resetPassword(
      { token, password },
      {
        onSuccess: () => setDone(true),
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
          0%   { box-shadow: 0 0 0 0 rgba(212,175,55,0.35); }
          70%  { box-shadow: 0 0 0 14px rgba(212,175,55,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
        }
      `}</style>

      <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4 pt-16">
        {/* Background glow */}
        <div
          className="absolute w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
          }}
        />

        <div
          className="relative w-full max-w-md"
          style={{ animation: "fadeInUp 0.5s ease-out both" }}
        >
          <div className="bg-[#1A1A1A] border border-yellow-500/25 rounded-2xl p-8 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
            {/* Back link */}
            {!done && (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 text-yellow-500/60 hover:text-yellow-500 text-sm mb-8 transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                Back to Login
              </button>
            )}

            {!done ? (
              <>
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div
                    className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center"
                    style={{ animation: "pulse-ring 2.5s ease-out infinite" }}
                  >
                    <KeyRound className="w-7 h-7 text-yellow-500" />
                  </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                  <p className="text-yellow-500 text-xs font-semibold tracking-widest uppercase mb-2">
                    Account Security
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#E8D7B5]">
                    Reset Password
                  </h1>
                  <p className="text-yellow-500/55 text-sm mt-2 leading-relaxed">
                    Choose a strong new password for your Embrodivine account.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* New password */}
                  <div>
                    <label className="text-yellow-500 text-xs font-semibold uppercase tracking-wider block mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-500/50" />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-10 py-3 bg-[#101010] border border-yellow-500/30 rounded-xl text-[#E8D7B5] placeholder-yellow-500/30 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-yellow-500/50 hover:text-yellow-500 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Strength bar */}
                    {password.length > 0 && (
                      <div className="mt-2.5 space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((n) => (
                            <div
                              key={n}
                              className="flex-1 h-1 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor:
                                  strength >= n
                                    ? strengthColor
                                    : "rgba(212,175,55,0.15)",
                              }}
                            />
                          ))}
                        </div>
                        <p
                          className="text-xs font-medium"
                          style={{ color: strengthColor }}
                        >
                          {strengthLabel}
                        </p>
                      </div>
                    )}

                    {/* Checklist */}
                    {password.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {checks.map((c) => (
                          <li
                            key={c.label}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200"
                              style={{
                                backgroundColor: c.pass
                                  ? "rgba(34,197,94,0.15)"
                                  : "rgba(212,175,55,0.08)",
                                border: `1px solid ${c.pass ? "#22C55E" : "rgba(212,175,55,0.25)"}`,
                              }}
                            >
                              {c.pass && (
                                <svg
                                  viewBox="0 0 10 10"
                                  className="w-2 h-2"
                                  fill="none"
                                >
                                  <path
                                    d="M2 5l2.5 2.5L8 3"
                                    stroke="#22C55E"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </span>
                            <span
                              style={{
                                color: c.pass
                                  ? "#22C55E"
                                  : "rgba(212,175,55,0.45)",
                              }}
                            >
                              {c.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label className="text-yellow-500 text-xs font-semibold uppercase tracking-wider block mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-yellow-500/50" />
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Re-enter new password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        className={`w-full pl-10 pr-10 py-3 bg-[#101010] rounded-xl text-[#E8D7B5] placeholder-yellow-500/30 focus:outline-none transition-all text-sm border ${
                          confirm.length === 0
                            ? "border-yellow-500/30 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20"
                            : passwordsMatch
                              ? "border-[#22C55E]/60 focus:border-[#22C55E]"
                              : "border-[#EF4444]/50 focus:border-[#EF4444]"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-yellow-500/50 hover:text-yellow-500 transition-colors"
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {confirm.length > 0 && !passwordsMatch && (
                      <p className="text-[#EF4444] text-xs mt-1.5">
                        Passwords do not match.
                      </p>
                    )}
                    {passwordsMatch && (
                      <p className="text-[#22C55E] text-xs mt-1.5">
                        Passwords match.
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-yellow-500 text-[#101010] hover:bg-[#E8D7B5] active:scale-[0.98]"
                  >
                    {isPending ? (
                      <>
                        <span className="w-4 h-4 border-2 border-[#101010]/40 border-t-[#101010] rounded-full animate-spin" />
                        Updating…
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        Reset Password
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* ── Success state ── */
              <div
                className="text-center py-4"
                style={{ animation: "fadeInUp 0.4s ease-out both" }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/40 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-[#22C55E]" />
                  </div>
                </div>

                <p className="text-yellow-500 text-xs font-semibold tracking-widest uppercase mb-2">
                  All Done
                </p>
                <h2 className="text-2xl font-bold text-[#E8D7B5] mb-3">
                  Password Updated
                </h2>
                <p className="text-yellow-500/55 text-sm leading-relaxed mb-8">
                  Your password has been reset successfully. You can now sign in
                  with your new password.
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-yellow-500 text-[#101010] hover:bg-[#E8D7B5] transition-all duration-200 active:scale-[0.98]"
                >
                  Go to Login
                </button>
              </div>
            )}
          </div>

          {/* Brand footer */}
          <p className="text-center text-yellow-500/25 text-xs mt-6 tracking-wider">
            EMBRODIVINE · Embroidery Digitizing Services
          </p>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
