import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link2,
  MessageCircle,
  Share2,
  Check,
  Copy,
} from "lucide-react";

const ShareModal = ({ isOpen, onClose, productData }) => {
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState(null);

  // Default product data if none provided
  const product = productData || {
    name: "No Product",
    price: "0.00",
    images:
      "https://t4.ftcdn.net/jpg/05/97/47/95/360_F_597479556_7bbQ7t4Z8k3xbAloHFHVdZIizWK1PdOo.jpg",
  };

  const shareUrl =
    product.url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = `Check out ${product.name} on our embroidery store!`;
  const shareDescription = `Amazing embroidered patch for only $${product.price}`;

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}`,
      bgColor: "bg-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl,
      )}&text=${encodeURIComponent(shareTitle)}`,
      bgColor: "bg-sky-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "#0A66C2",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl,
      )}`,
      bgColor: "bg-blue-700",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "#25D366",
      url: `https://wa.me/?text=${encodeURIComponent(
        shareTitle + " " + shareUrl,
      )}`,
      bgColor: "bg-green-500",
    },
    {
      name: "Email",
      icon: Mail,
      color: "#D4AF37",
      url: `mailto:?subject=${encodeURIComponent(
        shareTitle,
      )}&body=${encodeURIComponent(shareDescription + "\n\n" + shareUrl)}`,
      bgColor: "bg-[#D4AF37]",
    },
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform) => {
    setShareMethod(platform.name);
    setTimeout(() => setShareMethod(null), 1000);
    window.open(platform.url, "_blank", "width=600,height=400");
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-lg w-full overflow-hidden relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#101010] transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-br from-[#D4AF37]/20 to-transparent py-3 px-6 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-3 ">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-xl flex items-center justify-center border border-[#D4AF37]/30">
                    <Share2 className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#E8D7B5]">
                      Share Product
                    </h2>
                    <p className="text-[#D4AF37]/70 text-sm">
                      Spread the word about this design
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Preview */}
              <div className="p-6 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-4 bg-[#101010] rounded-xl p-4 border border-[#D4AF37]/20">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-[#E8D7B5] font-semibold mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[#D4AF37] font-bold text-lg">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Platforms */}
              <div className="p-6">
                <h3 className="text-[#E8D7B5] font-semibold mb-4">Share via</h3>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {socialPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    const isActive = shareMethod === platform.name;

                    return (
                      <motion.button
                        key={platform.name}
                        onClick={() => handleShare(platform)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          isActive
                            ? "border-[#D4AF37] bg-[#D4AF37]/10"
                            : "border-[#D4AF37]/20 bg-[#101010] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <div
                          className={`w-12 h-12 ${platform.bgColor} rounded-full flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[#E8D7B5] text-xs font-medium">
                          {platform.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Copy Link */}
                <div>
                  <h3 className="text-[#E8D7B5] font-semibold mb-3">
                    Or copy link
                  </h3>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-[#101010] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#D4AF37]/70 text-sm overflow-hidden">
                      <div className="truncate">{shareUrl}</div>
                    </div>
                    <motion.button
                      onClick={handleCopyLink}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                        copied
                          ? "bg-green-500 text-white"
                          : "bg-[#D4AF37] text-[#101010] hover:bg-[#E8D7B5]"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-5 h-5" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-5 h-5" />
                          Copy
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#101010]/50 px-6 py-4 border-t border-[#D4AF37]/20">
                <p className="text-[#D4AF37]/60 text-xs text-center">
                  Share this product with friends and family
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
