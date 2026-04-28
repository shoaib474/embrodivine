import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Shield,
  Mail,
  Phone,
  Calendar,
  Download,
  Plus,
  X,
  Check,
  ChevronDown,
  Eye,
  Ban,
  Crown,
  Star,
  AlertCircle,
} from "lucide-react";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      role: "admin",
      status: "active",
      joinDate: "2023-01-15",
      lastActive: "2024-02-15",
      orders: 24,
      spent: "$1,245.50",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      phone: "+1 (555) 234-5678",
      role: "customer",
      status: "active",
      joinDate: "2023-03-22",
      lastActive: "2024-02-14",
      orders: 12,
      spent: "$567.80",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "+1 (555) 345-6789",
      role: "moderator",
      status: "active",
      joinDate: "2023-05-10",
      lastActive: "2024-02-13",
      orders: 8,
      spent: "$342.20",
      avatar: "EW",
    },
    {
      id: 4,
      name: "James Rodriguez",
      email: "james.rod@example.com",
      phone: "+1 (555) 456-7890",
      role: "customer",
      status: "inactive",
      joinDate: "2023-07-18",
      lastActive: "2024-01-05",
      orders: 3,
      spent: "$125.00",
      avatar: "JR",
    },
    {
      id: 5,
      name: "Olivia Brown",
      email: "olivia.brown@example.com",
      phone: "+1 (555) 567-8901",
      role: "customer",
      status: "active",
      joinDate: "2023-09-25",
      lastActive: "2024-02-15",
      orders: 18,
      spent: "$892.30",
      avatar: "OB",
    },
    {
      id: 6,
      name: "David Kim",
      email: "david.kim@example.com",
      phone: "+1 (555) 678-9012",
      role: "customer",
      status: "banned",
      joinDate: "2023-11-02",
      lastActive: "2024-01-20",
      orders: 2,
      spent: "$45.00",
      avatar: "DK",
    },
  ]);

  const roles = [
    {
      id: "admin",
      label: "Admin",
      icon: Crown,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      id: "moderator",
      label: "Moderator",
      icon: Shield,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      id: "customer",
      label: "Customer",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Active Users",
      value: users.filter((u) => u.status === "active").length,
      icon: UserCheck,
      color: "text-green-500",
    },
    {
      label: "Admins",
      value: users.filter((u) => u.role === "admin").length,
      icon: Crown,
      color: "text-[#D4AF37]",
    },
    {
      label: "Banned",
      value: users.filter((u) => u.status === "banned").length,
      icon: Ban,
      color: "text-red-500",
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) newSet.delete(userId);
      else newSet.add(userId);
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length)
      setSelectedUsers(new Set());
    else setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
  };

  const handleChangeRole = (userId, newRole) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );
    setShowRoleModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleBanUser = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "banned" ? "active" : "banned" }
          : user,
      ),
    );
  };

  const getRoleBadge = (role) => {
    const roleData = roles.find((r) => r.id === role);
    if (!roleData) return null;
    const Icon = roleData.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${roleData.bgColor} ${roleData.color}`}
      >
        <Icon className="w-3 h-3" />
        {roleData.label}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        color: "text-green-500",
        bg: "bg-green-500/10",
        dot: "bg-green-500",
        label: "Active",
      },
      inactive: {
        color: "text-gray-400",
        bg: "bg-gray-500/10",
        dot: "bg-gray-400",
        label: "Inactive",
      },
      banned: {
        color: "text-red-500",
        bg: "bg-red-500/10",
        dot: "bg-red-500",
        label: "Banned",
      },
    };
    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#101010] p-3 sm:p-5 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-1">
            User Management
          </h1>
          <p className="text-[#D4AF37]/70 text-sm sm:text-base">
            Manage users, roles, and permissions
          </p>
        </motion.div>

        {/* Stats Grid — 2 cols on mobile, 4 on lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4 sm:p-5 lg:p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${stat.color}`}
                  />
                  <span className="text-2xl sm:text-3xl font-bold text-[#E8D7B5]">
                    {stat.value}
                  </span>
                </div>
                <p className="text-[#D4AF37]/70 text-xs sm:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6"
        >
          <div className="flex flex-col gap-3">
            {/* Search + toggle row */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]/50" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-11 pr-4 py-2.5 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
                />
              </div>
              {/* Filter toggle on mobile */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex sm:hidden items-center gap-1.5 px-3 py-2.5 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] text-sm"
              >
                <Filter className="w-4 h-4" />
              </button>
              {/* Export always visible */}
              <button className="hidden sm:flex items-center gap-2 px-4 py-2.5 sm:py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all font-semibold text-sm whitespace-nowrap">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Export
              </button>
            </div>

            {/* Filters — always visible on sm+, toggleable on mobile */}
            <div
              className={`${showFilters ? "flex" : "hidden"} sm:flex flex-col sm:flex-row gap-2 sm:gap-3`}
            >
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="flex-1 px-3 py-2.5 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="customer">Customer</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 px-3 py-2.5 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="banned">Banned</option>
              </select>
              <button className="flex sm:hidden items-center justify-center gap-2 px-4 py-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all font-semibold text-sm">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Users Table / Card layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="p-4 sm:p-6 border-b border-[#D4AF37]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.size === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded accent-[#D4AF37]"
                />
                <span className="text-[#E8D7B5] font-semibold text-sm sm:text-base">
                  {selectedUsers.size > 0
                    ? `${selectedUsers.size} selected`
                    : `${filteredUsers.length} users`}
                </span>
              </div>
              {selectedUsers.size > 0 && (
                <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 transition-all text-xs sm:text-sm font-semibold">
                  Delete Selected
                </button>
              )}
            </div>
          </div>

          {/* ── DESKTOP TABLE (md+) ── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#101010]">
                <tr>
                  {[
                    "",
                    "User",
                    "Contact",
                    "Role",
                    "Status",
                    "Orders",
                    "Spent",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 lg:px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider"
                    >
                      {h === "" ? (
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded accent-[#D4AF37]"
                          onChange={handleSelectAll}
                        />
                      ) : (
                        h
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-[#D4AF37]/5 transition-colors"
                  >
                    <td className="px-4 lg:px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.has(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-4 h-4 rounded accent-[#D4AF37]"
                      />
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-[#D4AF37] to-[#C9A961] rounded-full flex items-center justify-center shrink-0">
                          <span className="text-[#101010] font-bold text-xs lg:text-sm">
                            {user.avatar}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#E8D7B5] font-semibold text-sm truncate">
                            {user.name}
                          </p>
                          <p className="text-[#D4AF37]/60 text-xs">
                            Joined {user.joinDate}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="text-xs lg:text-sm">
                        <p className="text-[#D4AF37]/70 flex items-center gap-1.5 truncate">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[150px] lg:max-w-none">
                            {user.email}
                          </span>
                        </p>
                        <p className="text-[#D4AF37]/70 flex items-center gap-1.5 mt-1">
                          <Phone className="w-3.5 h-3.5 shrink-0" />
                          {user.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="text-[#E8D7B5] font-semibold text-sm">
                        {user.orders}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <span className="text-[#D4AF37] font-bold text-sm">
                        {user.spent}
                      </span>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowRoleModal(true);
                          }}
                          className="p-1.5 lg:p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all"
                          title="Change Role"
                        >
                          <Edit className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        </button>
                        <button
                          onClick={() => handleBanUser(user.id)}
                          className={`p-1.5 lg:p-2 rounded-lg transition-all ${
                            user.status === "banned"
                              ? "bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500/20"
                              : "bg-orange-500/10 border border-orange-500/30 text-orange-500 hover:bg-orange-500/20"
                          }`}
                          title={
                            user.status === "banned" ? "Unban User" : "Ban User"
                          }
                        >
                          <Ban className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteModal(true);
                          }}
                          className="p-1.5 lg:p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/20 transition-all"
                          title="Delete User"
                        >
                          <Trash2 className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── MOBILE CARD LIST (< md) ── */}
          <div className="md:hidden divide-y divide-[#D4AF37]/10">
            {filteredUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4"
              >
                {/* Card Top Row */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                    className="w-4 h-4 rounded accent-[#D4AF37] mt-1 shrink-0"
                  />
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C9A961] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-[#101010] font-bold text-sm">
                      {user.avatar}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[#E8D7B5] font-semibold text-sm truncate">
                        {user.name}
                      </p>
                      {getStatusBadge(user.status)}
                    </div>
                    <p className="text-[#D4AF37]/60 text-xs mt-0.5">
                      Joined {user.joinDate}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="mt-3 ml-7 space-y-1.5">
                  <p className="text-[#D4AF37]/70 text-xs flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </p>
                  <p className="text-[#D4AF37]/70 text-xs flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    {user.phone}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-3 ml-7 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getRoleBadge(user.role)}
                    <span className="text-[#D4AF37]/60 text-xs">
                      {user.orders} orders
                    </span>
                    <span className="text-[#D4AF37] font-bold text-xs">
                      {user.spent}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowRoleModal(true);
                      }}
                      className="p-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleBanUser(user.id)}
                      className={`p-1.5 rounded-lg transition-all ${
                        user.status === "banned"
                          ? "bg-green-500/10 border border-green-500/30 text-green-500"
                          : "bg-orange-500/10 border border-orange-500/30 text-orange-500"
                      }`}
                    >
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setUserToDelete(user);
                        setShowDeleteModal(true);
                      }}
                      className="p-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/20 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="py-16 text-center">
              <Users className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-3" />
              <p className="text-[#D4AF37]/50 text-sm">No users found</p>
            </div>
          )}
        </motion.div>

        {/* Change Role Modal */}
        <AnimatePresence>
          {showRoleModal && selectedUser && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl w-full max-w-md p-5 sm:p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#E8D7B5]">
                    Change User Role
                  </h3>
                  <button
                    onClick={() => {
                      setShowRoleModal(false);
                      setSelectedUser(null);
                    }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#101010] rounded-lg border border-[#D4AF37]/20 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C9A961] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-[#101010] font-bold text-sm">
                      {selectedUser.avatar}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#E8D7B5] font-semibold text-sm truncate">
                      {selectedUser.name}
                    </p>
                    <p className="text-[#D4AF37]/70 text-xs truncate">
                      {selectedUser.email}
                    </p>
                  </div>
                </div>

                <p className="text-[#D4AF37]/70 text-sm mb-3">
                  Select a new role for this user:
                </p>
                <div className="space-y-2.5">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() =>
                          handleChangeRole(selectedUser.id, role.id)
                        }
                        className={`w-full flex items-center gap-3 p-3 sm:p-4 rounded-lg border-2 transition-all ${
                          selectedUser.role === role.id
                            ? "border-[#D4AF37] bg-[#D4AF37]/10"
                            : "border-[#D4AF37]/20 bg-[#101010] hover:border-[#D4AF37]/50"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 ${role.bgColor} rounded-lg flex items-center justify-center shrink-0`}
                        >
                          <Icon className={`w-4 h-4 ${role.color}`} />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-[#E8D7B5] font-semibold text-sm">
                            {role.label}
                          </p>
                          <p className="text-[#D4AF37]/60 text-xs">
                            {role.id === "admin" && "Full system access"}
                            {role.id === "moderator" && "Content management"}
                            {role.id === "customer" && "Standard user"}
                          </p>
                        </div>
                        {selectedUser.role === role.id && (
                          <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && userToDelete && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1A1A1A] border-2 border-red-500/30 rounded-2xl w-full max-w-md p-5 sm:p-6"
              >
                <div className="text-center mb-5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#E8D7B5] mb-2">
                    Delete User?
                  </h3>
                  <p className="text-[#D4AF37]/70 text-sm">
                    Are you sure you want to delete{" "}
                    <span className="text-[#E8D7B5] font-semibold">
                      {userToDelete.name}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteModal(false);
                      setUserToDelete(null);
                    }}
                    className="flex-1 px-4 py-2.5 sm:py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteUser(userToDelete.id)}
                    className="flex-1 px-4 py-2.5 sm:py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-all text-sm"
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

export default AdminUsers;
