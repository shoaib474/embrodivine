import React, { useEffect, useState } from "react";
import { Download, Package, Clock, CheckCircle, Calendar } from "lucide-react";
import axios from "axios";
import { useMyOrders } from "../../hooks/useOrder";

const API = import.meta.env.VITE_API_URL;

const Orders = () => {
  const { data, isLoading } = useMyOrders();
  console.log(data);

  const orders = data?.orders || data || [];

  const handleDownload = (fileUrl) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "cancelled":
        return <Package className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-[#D4AF37]" />;
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
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#E8D7B5]">My Orders</h2>
        <div className="flex items-center gap-2 text-sm text-[#D4AF37]/70">
          <Package className="w-4 h-4" />
          <span>{orders.length} orders</span>
        </div>
      </div>

      {isLoading ? (
        <p className="text-[#D4AF37]/70 text-center">Loading orders...</p>
      ) : orders.length == 0 ? (
        <p className="text-[#D4AF37]/70 text-center">You have no orders yet.</p>
      ) : (
        orders.map((order, idx) => (
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
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#E8D7B5]">
                      {"#" + order?.orderId}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-[#D4AF37]/70 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(order.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-[#D4AF37]/70">Total Amount</p>
                  <p className="text-[#D4AF37] font-bold">
                    ${(order.items.reduce((total, item) => total + (item.price * item.quantity), 0)).toFixed(2) ?? "0.00"}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {order.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex items-center justify-between p-4 bg-[#101010] rounded-lg border border-[#D4AF37]/10"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-[#E8D7B5] font-semibold mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[#D4AF37]/70">
                            Quantity: {item.quantity}
                          </p>
                          <p className="text-sm text-[#D4AF37]/70">
                            File: {item.file || "ZIP File"}
                          </p>
                        </div>
                        <p className="text-[#D4AF37] font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {order.downloadable && order.status === "paid" && (
                        <button
                          onClick={() => handleDownload(item.downloadUrl)}
                          className="mt-4 flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105"
                        >
                          <Download className="w-4 h-4" />
                          Download Design File
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Download All Button */}
              {order.downloadable &&
                order.status === "paid" &&
                order.items.length > 1 && (
                  <div className="mt-4 pt-4 border-t border-[#D4AF37]/20">
                    <button
                      onClick={() => {
                        order.items.forEach((item) =>
                          handleDownload(item.downloadUrl),
                        );
                      }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#101010] border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all duration-300"
                    >
                      <Download className="w-5 h-5" />
                      Download All Files
                    </button>
                  </div>
                )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
