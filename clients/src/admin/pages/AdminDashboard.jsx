import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
} from "lucide-react";
import { useAllOrders } from "../../hooks/useOrder";
import { useProducts } from "../../hooks/useProduct";

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const { data, isLoading } = useAllOrders();
  const { data: productsData } = useProducts();

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
    { id: "orders", icon: ShoppingCart, label: "Orders", badge: "12" },
    { id: "products", icon: Package, label: "Products", badge: null },
    { id: "customers", icon: Users, label: "Customers", badge: null },
    { id: "reviews", icon: Star, label: "Reviews", badge: "5" },
    { id: "reports", icon: FileText, label: "Reports", badge: null },
    { id: "settings", icon: Settings, label: "Settings", badge: null },
  ];

  const orders = data?.orders || data || [];
  const products = productsData?.products || productsData || [];
  // console.log(orders);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${orders.reduce((sum, o) => sum + o.amount, 0).toFixed(2)}`,
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "#D4AF37",
    },
    {
      title: "Orders",
      value: orders.length,
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      color: "#4169E1",
    },
    {
      title: "Products Sold",
      value: "1,284",
      change: "+23.1%",
      trend: "up",
      icon: Package,
      color: "#32CD32",
    },
    {
      title: "Customers",
      value: "892",
      change: "-2.4%",
      trend: "down",
      icon: Users,
      color: "#FF6347",
    },
  ];

  // const recentOrders = [
  //   {
  //     id: "#ORD-1234",
  //     customer: "John Doe",
  //     product: "Golden Dragon Patch",
  //     amount: "$31.98",
  //     status: "Completed",
  //     date: "2 hours ago",
  //   },
  //   {
  //     id: "#ORD-1235",
  //     customer: "Jane Smith",
  //     product: "Custom Logo Design",
  //     amount: "$125.00",
  //     status: "Processing",
  //     date: "5 hours ago",
  //   },
  //   {
  //     id: "#ORD-1236",
  //     customer: "Mike Johnson",
  //     product: "Vintage Rose Patch",
  //     amount: "$12.99",
  //     status: "Pending",
  //     date: "1 day ago",
  //   },
  //   {
  //     id: "#ORD-1237",
  //     customer: "Sarah Williams",
  //     product: "Team Jersey Set",
  //     amount: "$45.99",
  //     status: "Completed",
  //     date: "1 day ago",
  //   },
  //   {
  //     id: "#ORD-1238",
  //     customer: "David Brown",
  //     product: "Wolf Spirit Badge",
  //     amount: "$44.97",
  //     status: "Shipped",
  //     date: "2 days ago",
  //   },
  // ];

  const topProducts = [
    {
      name: "Golden Dragon Patch",
      sales: 156,
      revenue: "$2,496.44",
      stock: 45,
      trend: "up",
    },
    {
      name: "Custom Logo Patches",
      sales: 89,
      revenue: "$2,225.00",
      stock: 12,
      trend: "up",
    },
    {
      name: "Vintage Rose Design",
      sales: 78,
      revenue: "$1,013.22",
      stock: 32,
      trend: "down",
    },
    {
      name: "Military Insignia",
      sales: 67,
      revenue: "$803.33",
      stock: 67,
      trend: "up",
    },
  ];

  const notifications = [
    {
      id: 1,
      text: "New order received from John Doe",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      text: "Low stock alert: Golden Dragon Patch",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "Payment received: $125.00",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: 4,
      text: "New customer registration",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "shipped":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-[#101010] flex">
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activeMenu === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              {/* Welcome */}
              <div>
                <h2 className="text-3xl font-bold text-[#E8D7B5] mb-2">
                  Welcome back, Admin! 👋
                </h2>
                <p className="text-[#D4AF37]/80">
                  Here's what's happening with your store today.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${stat.color}20` }}
                        >
                          <Icon
                            className="w-6 h-6"
                            style={{ color: stat.color }}
                          />
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm font-semibold ${
                            stat.trend === "up"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {stat.trend === "up" ? (
                            <ArrowUpRight className="w-4 h-4" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4" />
                          )}
                          {stat.change}
                        </div>
                      </div>
                      <p className="text-[#D4AF37]/70 text-sm mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-[#E8D7B5]">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#E8D7B5]">
                      Recent Orders
                    </h3>
                    <Link
                      to="/admin/orders"
                      className="text-[#D4AF37] text-sm font-semibold hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {orders.map((order, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-[#101010] rounded-lg border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-[#E8D7B5] font-semibold">
                              {order._id}
                            </p>
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[#D4AF37]/70 text-sm">
                            {order?.customer?.name || "No Name"} •{" "}
                            {Array.isArray(order?.items)
                              ? order.items
                                  .map((p) => p?.name)
                                  .filter(Boolean)
                                  .join(", ")
                              : "No Products"}
                          </p>
                          <p className="text-[#D4AF37]/50 text-xs mt-1">
                            {order.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="text-[#D4AF37] font-bold">
                            {order.amount}
                          </p>
                          <button className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-[#D4AF37]" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-[#E8D7B5] mb-6">
                    Top Products
                  </h3>
                  <div className="space-y-4">
                    {products.map((product, idx) => (
                      <div
                        key={idx}
                        className="pb-4 border-b border-[#D4AF37]/10 last:border-0"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-[#E8D7B5] font-semibold text-sm">
                            {product.name}
                          </p>
                          {product.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#D4AF37]/70">
                            {product.sales} sales
                          </span>
                          <span className="text-[#D4AF37] font-bold">
                            {product.revenue}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu !== "dashboard" && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto">
                  <Package className="w-10 h-10 text-[#D4AF37]" />
                </div>
                <h3 className="text-2xl font-bold text-[#E8D7B5]">
                  {menuItems.find((m) => m.id === activeMenu)?.label} Section
                </h3>
                <p className="text-[#D4AF37]/70">
                  This section is under construction
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
