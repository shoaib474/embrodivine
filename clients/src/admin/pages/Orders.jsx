import React, { useState } from "react";
import Swal from "sweetalert2";
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
  Mail,
  MapPin,
  Crosshair,
  Trash,
  Trash2,
} from "lucide-react";

import { useInvoice } from "../../hooks/useInvoice";
import {
  useAllOrders,
  useDeleteOrder,
  useUpdateOrderStatus,
} from "../../hooks/useOrder";
import OrderSkeleton from "../components/OrderSkeleton";

const AdminOrders = () => {
  const { data, isLoading } = useAllOrders();
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();
  const { mutate: deleteOrder } = useDeleteOrder();
  const { downloadInvoice, loading } = useInvoice();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const orders = data?.orders || data || [];

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      color: "#D4AF37",
      change: "+12%",
    },
    {
      title: "Revenue",
      value: `$${orders
        .filter((o) => o.paymentStatus === "paid")
        .reduce((sum, o) => sum + o.amount, 0)
        .toFixed(2)}`,
      icon: DollarSign,
      color: "#32CD32",
      change: "+18%",
    },
    {
      title: "Pending",
      value: orders.filter((o) => o.status === "pending").length,
      icon: Clock,
      color: "#FF6347",
      change: "-5%",
    },
    {
      title: "Paid",
      value: orders.filter((o) => o.status === "paid").length,
      icon: CheckCircle,
      color: "#4169E1",
      change: "+22%",
    },
  ];

  const statuses = ["all", "pending", "paid", "cancelled"];
  const dateFilters = ["all", "today", "week", "month"];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order._id;
    order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "pending":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5" />;
      case "cancelled":
        return <X className="w-4 h-4 sm:w-5 sm:h-5" />;
      default:
        return <Package className="w-4 h-4 sm:w-5 sm:h-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-500 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  const handleDelete = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(orderId);
      }
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateStatus({
      orderId,
      status: newStatus,
    });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen bg-[#101010] p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8D7B5] mb-2">
            Orders Management
          </h1>
          <p className="text-sm sm:text-base text-[#D4AF37]/70">
            Track and manage customer orders
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4 sm:p-6 hover:border-[#D4AF37] transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      stat.change.startsWith("+")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-[#D4AF37]/70 text-xs sm:text-sm mb-1">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-[#E8D7B5]">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]/60" />
              <input
                type="text"
                placeholder="Search orders, customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-colors capitalize text-sm sm:text-base"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 sm:px-4 py-2 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-colors capitalize text-sm sm:text-base"
            >
              {dateFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <p className="text-xs sm:text-sm text-[#D4AF37]/70">
              Showing{" "}
              <span className="text-[#D4AF37] font-semibold">
                {filteredOrders.length}
              </span>{" "}
              orders
            </p>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4 sm:space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <OrderSkeleton key={i} />
              ))}
            </div>
          ) : (
            filteredOrders.map((order, idx) => (
              <div
                key={order._id}
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
                          <span className="text-[#E8D7B5]">
                            {order.customer.name}
                          </span>
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
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
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
            ))
          )}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <ShoppingCart className="w-16 h-16 sm:w-20 sm:h-20 text-[#D4AF37]/30 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-[#E8D7B5] mb-2">
              No Orders Found
            </h3>
            <p className="text-sm sm:text-base text-[#D4AF37]/70">
              Try adjusting your filters
            </p>
          </div>
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedOrder && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <div
              className="bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#E8D7B5]">
                  Order Details
                </h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-[#D4AF37] hover:text-[#E8D7B5]"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[#D4AF37] font-bold mb-3">Order ID</h3>
                  <p className="text-[#E8D7B5] text-lg">{selectedOrder._id}</p>
                </div>

                <div>
                  <h3 className="text-[#D4AF37] font-bold mb-3">Customer</h3>
                  <div className="bg-[#101010] rounded-lg p-4 space-y-2">
                    <p className="text-[#E8D7B5]">
                      {selectedOrder.customer.name}
                    </p>
                    <p className="text-[#D4AF37]/70 text-sm">
                      {selectedOrder.customer.email}
                    </p>
                    <p className="text-[#D4AF37]/70 text-sm">
                      {selectedOrder.customer.phone}
                    </p>
                    <p className="text-[#D4AF37]/70 text-sm">
                      {selectedOrder.customer.address}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[#D4AF37] font-bold mb-3">Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#101010] rounded-lg p-4 flex justify-between"
                      >
                        <div>
                          <p className="text-[#E8D7B5] font-semibold">
                            {item.name}
                          </p>
                          <p className="text-[#D4AF37]/70 text-sm">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-[#D4AF37] font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#D4AF37]/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#E8D7B5] font-bold text-lg">
                      Total
                    </span>
                    <span className="text-[#D4AF37] font-bold text-2xl">
                      ${selectedOrder.amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
