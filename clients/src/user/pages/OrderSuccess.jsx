import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* CARD */}
        <div className="rounded-2xl shadow-2xl border border-yellow-500/20 bg-[#111] p-8 text-center space-y-6">
          {/* ICON */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex justify-center"
          >
            <CheckCircle className="text-green-500 w-20 h-20" />
          </motion.div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-white">
            Order Placed Successfully 🎉
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-400 text-sm">
            Thank you for your purchase! Your embroidery design will be
            processed shortly. You will receive a confirmation email soon.
          </p>

          {/* ORDER INFO */}
          <div className="bg-black/40 border border-yellow-500/20 rounded-xl p-4 text-left text-sm text-gray-300 space-y-2">
            <p>
              <span className="text-gray-500">Order ID:</span> #123456
            </p>
            <p>
              <span className="text-gray-500">Payment:</span> Paid via PayPal
            </p>
            <p>
              <span className="text-gray-500">Delivery:</span> Instant Download
              Link
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-medium hover:bg-yellow-400 transition"
            >
              Back to Home
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="border border-yellow-500 text-yellow-500 px-5 py-2 rounded-lg font-medium hover:bg-yellow-500 hover:text-black transition"
            >
              View Orders
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
