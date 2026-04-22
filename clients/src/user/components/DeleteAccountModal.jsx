import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useDeleteUserAccount } from "../../hooks/useProfile";

const API = import.meta.env.VITE_API_URL;

const DeleteAccountModal = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { mutate: deleteAccount, isPending } = useDeleteUserAccount();

  const [step, setStep] = useState(1);
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmText.toLowerCase() !== "delete") return;

    if (window.confirm("Are you sure you want to delete your account?")) {
      deleteAccount();
    }
  };

  const closeModal = () => {
    setStep(1);
    setConfirmText("");
    setIsDeleting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-2xl shadow-2xl max-w-md w-full p-8"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            {/* Step 1: Warning */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <motion.div
                    className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-3xl">⚠️</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
                    Delete Account?
                  </h3>
                  <p className="text-[#D4AF37]/70">We're sad to see you go</p>
                </div>

                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-red-400 mb-2">
                    This action will:
                  </h4>
                  <ul className="text-sm text-red-400/80 space-y-1">
                    <li>• Permanently delete your account</li>
                    <li>• Remove all your personal data</li>
                    <li>• Cancel any subscriptions</li>
                    <li>• This cannot be undone</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={closeModal}
                    className="flex-1 bg-[#101010] border border-[#D4AF37]/30 text-[#E8D7B5] py-3 rounded-full font-medium"
                    whileHover={{ scale: 1.02, backgroundColor: "#1A1A1A" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-red-500 text-white py-3 rounded-full font-medium"
                    whileHover={{ scale: 1.02, backgroundColor: "#DC2626" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Confirmation */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
                    Confirm Deletion
                  </h3>
                  <p className="text-[#D4AF37]/70">
                    Type{" "}
                    <span className="font-semibold text-red-400">DELETE</span>{" "}
                    to confirm
                  </p>
                </div>

                <div className="mb-6">
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type DELETE here"
                    className="w-full px-4 py-3 rounded-lg bg-[#101010] border-2 border-[#D4AF37]/30 focus:border-red-500 focus:outline-none transition-colors text-center font-semibold text-[#E8D7B5] placeholder:text-[#D4AF37]/40"
                    autoFocus
                  />
                </div>

                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-[#101010] border border-[#D4AF37]/30 text-[#E8D7B5] py-3 rounded-full font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                  <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className={`flex-1 py-3 rounded-full font-medium transition-all ${
                      confirmText.toLowerCase() === "delete" && !isDeleting
                        ? "bg-red-500 text-white"
                        : "bg-[#101010] border border-[#D4AF37]/20 text-[#D4AF37]/40 cursor-not-allowed"
                    }`}
                  >
                    {isPending ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center py-4">
                  <motion.div
                    className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6, delay: 0.1 }}
                  >
                    <motion.span
                      className="text-4xl text-green-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      ✓
                    </motion.span>
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
                    Account Deleted
                  </h3>
                  <p className="text-[#D4AF37]/70 mb-6">
                    Your account has been permanently deleted. We hope to see
                    you again someday.
                  </p>
                  <motion.button
                    onClick={closeModal}
                    className="bg-[#D4AF37] text-[#101010] px-8 py-3 rounded-full font-medium hover:bg-[#E8D7B5]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteAccountModal;
