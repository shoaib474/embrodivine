import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5F7FA] via-white to-[#F5F7FA] p-4">
      <div className="w-full max-w-lg">
        {/* CARD */}
        <div className="rounded-2xl shadow-xl border border-[#007BFF]/20 bg-white p-8 text-center space-y-6">
          {/* ICON */}
          <div className="flex justify-center">
            <CheckCircle className="text-green-500 w-20 h-20" />
          </div>

          {/* TITLE */}
          <h1 className="text-3xl font-bold text-[#222222]">
            Order Placed Successfully 🎉
          </h1>

          {/* DESCRIPTION */}
          <p className="text-[#333333] text-sm">
            Thank you for your purchase! Your embroidery design will be
            processed shortly. You will receive a confirmation email soon.
          </p>

          {/* ORDER INFO */}
          <div className="bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl p-4 text-left text-sm text-[#333333] space-y-2">
            <p>
              <span className="text-[#666666]">Order ID:</span> #123456
            </p>
            <p>
              <span className="text-[#666666]">Payment:</span> Paid via PayPal
            </p>
            <p>
              <span className="text-[#666666]">Delivery:</span> Instant Download
              Link
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-[#007BFF] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#0066CC] transition"
            >
              Back to Home
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="border border-[#007BFF] text-[#007BFF] px-5 py-2 rounded-lg font-medium hover:bg-[#007BFF] hover:text-white transition"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
