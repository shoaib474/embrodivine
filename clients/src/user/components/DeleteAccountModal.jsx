import React, { useState, useEffect } from "react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative bg-white border border-[#007BFF]/20 rounded-2xl shadow-2xl max-w-md w-full p-8">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#007BFF]/60 hover:text-[#007BFF] transition-colors"
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

        {/* Step 1: Warning */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold text-[#222222] mb-2">
                Delete Account?
              </h3>
              <p className="text-[#007BFF]/70">We're sad to see you go</p>
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
              <button
                onClick={closeModal}
                className="flex-1 bg-[#F5F7FA] border border-[#007BFF]/30 text-[#333333] py-3 rounded-full font-medium hover:scale-[1.02] hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-red-500 text-white py-3 rounded-full font-medium hover:scale-[1.02] hover:bg-red-600 transition-all active:scale-[0.98]"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-2xl font-bold text-[#222222] mb-2">
                Confirm Deletion
              </h3>
              <p className="text-[#007BFF]/70">
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
                className="w-full px-4 py-3 rounded-lg bg-[#F5F7FA] border-2 border-[#007BFF]/30 focus:border-red-500 focus:outline-none transition-colors text-center font-semibold text-[#333333] placeholder:text-[#007BFF]/40"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-[#F5F7FA] border border-[#007BFF]/30 text-[#333333] py-3 rounded-full font-medium hover:scale-[1.02] transition-all active:scale-[0.98]"
              >
                Back
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className={`flex-1 py-3 rounded-full font-medium transition-all ${
                  confirmText.toLowerCase() === "delete" && !isDeleting
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-[#F5F7FA] border border-[#007BFF]/20 text-[#007BFF]/40 cursor-not-allowed"
                }`}
              >
                {isPending ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div>
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl text-green-400">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#222222] mb-2">
                Account Deleted
              </h3>
              <p className="text-[#007BFF]/70 mb-6">
                Your account has been permanently deleted. We hope to see
                you again someday.
              </p>
              <button
                onClick={closeModal}
                className="bg-[#007BFF] text-white px-8 py-3 rounded-full font-medium hover:bg-[#0066CC] hover:scale-105 active:scale-95 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountModal;