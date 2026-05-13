import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Copy,
  Check,
  X,
  Calendar,
  Percent,
  DollarSign,
  Users,
  Package,
  AlertCircle,
  TrendingUp,
  Clock,
  MoreVertical,
  Eye,
  EyeOff,
} from "lucide-react";

const AdminCoupons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    minPurchase: "",
    maxDiscount: "",
    usageLimit: "",
    perUserLimit: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "SAVE20",
      type: "percentage",
      value: 20,
      minPurchase: 50,
      maxDiscount: 100,
      usageLimit: 100,
      used: 45,
      perUserLimit: 1,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      description: "20% off on orders above $50",
    },
    {
      id: 2,
      code: "WELCOME10",
      type: "fixed",
      value: 10,
      minPurchase: 0,
      maxDiscount: null,
      usageLimit: 500,
      used: 234,
      perUserLimit: 1,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      description: "Welcome discount for new customers",
    },
    {
      id: 3,
      code: "SUMMER25",
      type: "percentage",
      value: 25,
      minPurchase: 100,
      maxDiscount: 50,
      usageLimit: 50,
      used: 50,
      perUserLimit: 2,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "expired",
      description: "Summer sale - 25% off",
    },
    {
      id: 4,
      code: "FREESHIP",
      type: "free_shipping",
      value: 0,
      minPurchase: 30,
      maxDiscount: null,
      usageLimit: 1000,
      used: 567,
      perUserLimit: 3,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      description: "Free shipping on orders above $30",
    },
    {
      id: 5,
      code: "VIP50",
      type: "fixed",
      value: 50,
      minPurchase: 200,
      maxDiscount: null,
      usageLimit: 20,
      used: 8,
      perUserLimit: 1,
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "active",
      description: "VIP exclusive - $50 off",
    },
    {
      id: 6,
      code: "FLASH15",
      type: "percentage",
      value: 15,
      minPurchase: 0,
      maxDiscount: 30,
      usageLimit: 200,
      used: 156,
      perUserLimit: 1,
      startDate: "2024-02-01",
      endDate: "2024-02-07",
      status: "expired",
      description: "Flash sale - limited time",
    },
  ]);

  const stats = [
    {
      label: "Total Coupons",
      value: coupons.length,
      icon: Tag,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Active Coupons",
      value: coupons.filter((c) => c.status === "active").length,
      icon: Check,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Total Uses",
      value: coupons.reduce((sum, c) => sum + c.used, 0),
      icon: Users,
      color: "text-[#D4AF37]",
      bgColor: "bg-[#D4AF37]/10",
    },
    {
      label: "Expired",
      value: coupons.filter((c) => c.status === "expired").length,
      icon: Clock,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || coupon.status === statusFilter;
    const matchesType = typeFilter === "all" || coupon.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCoupon = () => {
    const newCoupon = {
      id: coupons.length + 1,
      ...formData,
      value: parseFloat(formData.value),
      minPurchase: parseFloat(formData.minPurchase) || 0,
      maxDiscount: formData.maxDiscount
        ? parseFloat(formData.maxDiscount)
        : null,
      usageLimit: parseInt(formData.usageLimit),
      used: 0,
      perUserLimit: parseInt(formData.perUserLimit),
      status: "active",
    };
    setCoupons([...coupons, newCoupon]);
    setShowCreateModal(false);
    resetForm();
  };

  const handleUpdateCoupon = () => {
    setCoupons(
      coupons.map((c) =>
        c.id === selectedCoupon.id ? { ...selectedCoupon, ...formData } : c,
      ),
    );
    setShowEditModal(false);
    setSelectedCoupon(null);
    resetForm();
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
    setShowDeleteModal(false);
    setSelectedCoupon(null);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const resetForm = () => {
    setFormData({
      code: "",
      type: "percentage",
      value: "",
      minPurchase: "",
      maxDiscount: "",
      usageLimit: "",
      perUserLimit: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const openEditModal = (coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      minPurchase: coupon.minPurchase.toString(),
      maxDiscount: coupon.maxDiscount ? coupon.maxDiscount.toString() : "",
      usageLimit: coupon.usageLimit.toString(),
      perUserLimit: coupon.perUserLimit.toString(),
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      description: coupon.description,
    });
    setShowEditModal(true);
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      percentage: {
        icon: Percent,
        label: "Percentage",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
      },
      fixed: {
        icon: DollarSign,
        label: "Fixed Amount",
        color: "text-green-500",
        bg: "bg-green-500/10",
      },
      free_shipping: {
        icon: Package,
        label: "Free Shipping",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
      },
    };
    const config = typeConfig[type];
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color: "text-green-500",
        bg: "bg-green-500/10",
        label: "Active",
      },
      expired: { color: "text-red-500", bg: "bg-red-500/10", label: "Expired" },
      disabled: {
        color: "text-gray-500",
        bg: "bg-gray-500/10",
        label: "Disabled",
      },
    };
    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  const CouponForm = ({ isEdit = false }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Coupon Code
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="SAVE20"
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all uppercase"
          />
        </div>
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Discount Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
            <option value="free_shipping">Free Shipping</option>
          </select>
        </div>
      </div>

      {formData.type !== "free_shipping" && (
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Discount Value {formData.type === "percentage" ? "(%)" : "($)"}
          </label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            placeholder={formData.type === "percentage" ? "20" : "10"}
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Min Purchase ($)
          </label>
          <input
            type="number"
            name="minPurchase"
            value={formData.minPurchase}
            onChange={handleInputChange}
            placeholder="0"
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
        {formData.type === "percentage" && (
          <div>
            <label className="block text-[#D4AF37]/70 text-sm mb-2">
              Max Discount ($)
            </label>
            <input
              type="number"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={handleInputChange}
              placeholder="Optional"
              className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Total Usage Limit
          </label>
          <input
            type="number"
            name="usageLimit"
            value={formData.usageLimit}
            onChange={handleInputChange}
            placeholder="100"
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Per User Limit
          </label>
          <input
            type="number"
            name="perUserLimit"
            value={formData.perUserLimit}
            onChange={handleInputChange}
            placeholder="1"
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#D4AF37]/70 text-sm mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Describe the coupon..."
          rows={3}
          className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => {
            if (isEdit) {
              setShowEditModal(false);
            } else {
              setShowCreateModal(false);
            }
            resetForm();
          }}
          className="flex-1 px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={isEdit ? handleUpdateCoupon : handleCreateCoupon}
          className="flex-1 px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all"
        >
          {isEdit ? "Update Coupon" : "Create Coupon"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#101010] p-3 sm:p-5 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-2">
              Coupon Management
            </h1>
            <p className="text-[#D4AF37]/70">
              Create and manage discount coupons
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Coupon
          </button>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6"
              >
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-[#D4AF37]/70 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#E8D7B5]">
                  {stat.value}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
              <input
                type="text"
                placeholder="Search coupons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
            >
              <option value="all">All Types</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
              <option value="free_shipping">Free Shipping</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </motion.div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCoupons.map((coupon, index) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="px-4 py-2 bg-[#D4AF37]/10 border-2 border-dashed border-[#D4AF37]/50 rounded-lg">
                      <span className="text-[#D4AF37] font-bold text-lg">
                        {coupon.code}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(coupon.code)}
                      className="p-2 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                    >
                      {copiedCode === coupon.code ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-[#D4AF37]/70 text-sm">
                    {coupon.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(coupon)}
                    className="p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCoupon(coupon);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#D4AF37]/70 text-sm">Type:</span>
                  {getTypeBadge(coupon.type)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4AF37]/70 text-sm">Discount:</span>
                  <span className="text-[#E8D7B5] font-semibold">
                    {coupon.type === "percentage" && `${coupon.value}%`}
                    {coupon.type === "fixed" && `$${coupon.value}`}
                    {coupon.type === "free_shipping" && "Free Shipping"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4AF37]/70 text-sm">
                    Min Purchase:
                  </span>
                  <span className="text-[#E8D7B5]">${coupon.minPurchase}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4AF37]/70 text-sm">Usage:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-[#101010] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4AF37]"
                        style={{
                          width: `${(coupon.used / coupon.usageLimit) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-[#E8D7B5] text-sm font-semibold">
                      {coupon.used}/{coupon.usageLimit}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4AF37]/70 text-sm">
                    Valid Period:
                  </span>
                  <span className="text-[#E8D7B5] text-sm">
                    {coupon.startDate} to {coupon.endDate}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
                {getStatusBadge(coupon.status)}
                <span className="text-[#D4AF37]/60 text-xs">
                  Per user limit: {coupon.perUserLimit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCoupons.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Tag className="w-10 h-10 text-[#D4AF37]/50" />
            </div>
            <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
              No coupons found
            </h3>
            <p className="text-[#D4AF37]/70 mb-6">
              Try adjusting your filters or create a new coupon
            </p>
          </div>
        )}

        {/* Create Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-2xl w-full p-6 my-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#E8D7B5]">
                    Create New Coupon
                  </h3>
                  <button
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <CouponForm />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Edit Modal */}
        <AnimatePresence>
          {showEditModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-2xl w-full p-6 my-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#E8D7B5]">
                    Edit Coupon
                  </h3>
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedCoupon(null);
                      resetForm();
                    }}
                    className="w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <CouponForm isEdit={true} />
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedCoupon && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#1A1A1A] border-2 border-red-500/30 rounded-2xl max-w-md w-full p-6"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
                    Delete Coupon?
                  </h3>
                  <p className="text-[#D4AF37]/70">
                    Are you sure you want to delete coupon{" "}
                    <span className="text-[#E8D7B5] font-semibold">
                      {selectedCoupon.code}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setSelectedCoupon(null);
                    }}
                    className="flex-1 px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteCoupon(selectedCoupon.id)}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminCoupons;
