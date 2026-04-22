import React from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  MoreVertical,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Clock,
  Package,
  Truck,
  CheckCircle,
  X,
  ChevronDown,
  Calendar,
  User,
  Album,
  Mail,
  MapPin,
  Crosshair,
  Trash,
  Trash2,
} from "lucide-react";
import { useInvoice } from "../../hooks/useInvoice";

const OrderCard = ({ idx,order }) => {
  const { downloadInvoice, loading } = useInvoice();

  return (
    <div
      className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300"
      style={{
        animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
      }}
    >
      {/* Order Header */}
      <div className="bg-[#101010] border-b border-[#D4AF37]/20 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              {getStatusIcon(order.status)}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#E8D7B5]">
                {"#" + order?.orderId}
              </h3>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1">
                <span className="text-xs sm:text-sm text-[#D4AF37]/70 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(order.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })} 
                </span>
                <span
                  className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                    order.status,
                  )} capitalize flex items-center gap-1`}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
                <span
                  className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full border ${
                    order.status === "paid"
                      ? "bg-green-500/20 text-green-500 border-green-500/30"
                      : order.status === "refunded"
                        ? "bg-orange-500/20 text-orange-500 border-orange-500/30"
                        : "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-[#D4AF37]/70">
                Total Amount
              </p>
              <p className="text-xl sm:text-2xl font-bold text-[#D4AF37]">
                ${order.amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Customer Info */}
          <div>
            <h4 className="text-[#D4AF37] font-bold mb-3 text-sm sm:text-base">
              Customer Information
            </h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#D4AF37]/60" />
                <span className="text-[#E8D7B5]">{order.customer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]/60" />
                <span className="text-[#D4AF37]/70">
                  {order.customer.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]/60" />
                <span className="text-[#D4AF37]/70">
                  {order.customer.address}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h4 className="text-[#D4AF37] font-bold mb-3 text-sm sm:text-base">
              Order Items
            </h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-start text-xs sm:text-sm"
                >
                  <span className="text-[#E8D7B5] flex-1">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-[#D4AF37] font-semibold ml-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-[#D4AF37]/20">
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] capitalize text-sm sm:text-base"
          >
            {statuses
              .filter((s) => s !== "all")
              .map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
          <button
            onClick={() => handleViewDetails(order)}
            className="px-4 sm:px-6 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={() => downloadInvoice(order._id)}
            disabled={loading}
            className="px-4 sm:px-6 py-2 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Download className="w-4 h-4" />
            {loading ? "Downloading..." : "Invoice"}
          </button>
          <button
            onClick={() => handleDelete(order._id)}
            className="group relative overflow-hidden px-5 py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-red-500/40 flex items-center gap-2"
          >
            {/* Glow effect */}
            <span className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 transition-all duration-300"></span>
            {/* Icon (optional if using lucide) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 3v1H4v2h16V4h-5V3H9zm-2 6v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V9H7z" />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;


