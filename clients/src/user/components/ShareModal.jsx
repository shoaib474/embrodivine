import React, { useEffect, useState } from "react";
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
      color: "#007BFF",
      url: `mailto:?subject=${encodeURIComponent(
        shareTitle,
      )}&body=${encodeURIComponent(shareDescription + "\n\n" + shareUrl)}`,
      bgColor: "bg-[#007BFF]",
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

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white border-2 border-[#007BFF]/30 rounded-2xl max-w-lg w-full overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#F5F7FA] border border-[#007BFF]/30 flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-br from-[#007BFF]/10 to-transparent py-3 px-6 border-b border-[#007BFF]/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#007BFF]/10 rounded-xl flex items-center justify-center border border-[#007BFF]/30">
                <Share2 className="w-6 h-6 text-[#007BFF]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#222222]">
                  Share Product
                </h2>
                <p className="text-[#007BFF]/70 text-sm">
                  Spread the word about this design
                </p>
              </div>
            </div>
          </div>

          {/* Product Preview */}
          <div className="p-6 border-b border-[#007BFF]/20">
            <div className="flex items-center gap-4 bg-[#F5F7FA] rounded-xl p-4 border border-[#007BFF]/20">
              <img
                src={product.images}
                alt={product.name}
                loading="lazy"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-[#222222] font-semibold mb-1">
                  {product.name}
                </h3>
                <p className="text-[#007BFF] font-bold text-lg">
                  ${product.price}
                </p>
              </div>
            </div>
          </div>

          {/* Social Platforms */}
          <div className="p-6">
            <h3 className="text-[#222222] font-semibold mb-4">Share via</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {socialPlatforms.map((platform) => {
                const Icon = platform.icon;
                const isActive = shareMethod === platform.name;

                return (
                  <button
                    key={platform.name}
                    onClick={() => handleShare(platform)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                      isActive
                        ? "border-[#007BFF] bg-[#007BFF]/10"
                        : "border-[#007BFF]/20 bg-[#F5F7FA] hover:border-[#007BFF]/50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 ${platform.bgColor} rounded-full flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[#333333] text-xs font-medium">
                      {platform.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Copy Link */}
            <div>
              <h3 className="text-[#222222] font-semibold mb-3">
                Or copy link
              </h3>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#F5F7FA] border border-[#007BFF]/30 rounded-lg px-4 py-3 text-black/70 text-sm overflow-hidden">
                  <div className="truncate">{shareUrl}</div>
                </div>
                <button
                  onClick={handleCopyLink}
                  className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 hover:scale-105 active:scale-95 ${
                    copied
                      ? "bg-green-500 text-white"
                      : "bg-[#007BFF] text-white hover:bg-[#0066CC]"
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
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#F5F7FA] px-6 py-4 border-t border-[#007BFF]/20">
            <p className="text-[#222222]/60 text-xs text-center">
              Share this product with friends and family
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;
