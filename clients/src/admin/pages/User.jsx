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
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
    }
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
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${roleData.bgColor} ${roleData.color}`}
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
        label: "Active",
      },
      inactive: {
        color: "text-gray-500",
        bg: "bg-gray-500/10",
        label: "Inactive",
      },
      banned: { color: "text-red-500", bg: "bg-red-500/10", label: "Banned" },
    };
    const config = statusConfig[status];
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#101010] p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-2">
            User Management
          </h1>
          <p className="text-[#D4AF37]/70">
            Manage users, roles, and permissions
          </p>
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
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-3xl font-bold text-[#E8D7B5]">
                    {stat.value}
                  </span>
                </div>
                <p className="text-[#D4AF37]/70 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Filters & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-all"
              />
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="customer">Customer</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37] transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>

            {/* Export Button */}
            <button className="px-6 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all flex items-center gap-2 font-semibold">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="p-6 border-b border-[#D4AF37]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.size === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-5 h-5 rounded accent-[#D4AF37]"
                />
                <span className="text-[#E8D7B5] font-semibold">
                  {selectedUsers.size > 0
                    ? `${selectedUsers.size} selected`
                    : `${filteredUsers.length} users`}
                </span>
              </div>
              {selectedUsers.size > 0 && (
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 transition-all text-sm font-semibold">
                    Delete Selected
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#101010]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded accent-[#D4AF37]"
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider">
                    Spent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase tracking-wider">
                    Actions
                  </th>
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
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.has(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="w-5 h-5 rounded accent-[#D4AF37]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C9A961] rounded-full flex items-center justify-center">
                          <span className="text-[#101010] font-bold text-sm">
                            {user.avatar}
                          </span>
                        </div>
                        <div>
                          <p className="text-[#E8D7B5] font-semibold">
                            {user.name}
                          </p>
                          <p className="text-[#D4AF37]/60 text-xs">
                            Joined {user.joinDate}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-[#D4AF37]/70 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </p>
                        <p className="text-[#D4AF37]/70 flex items-center gap-2 mt-1">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4">
                      <span className="text-[#E8D7B5] font-semibold">
                        {user.orders}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#D4AF37] font-bold">
                        {user.spent}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowRoleModal(true);
                          }}
                          className="p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all"
                          title="Change Role"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleBanUser(user.id)}
                          className={`p-2 rounded-lg transition-all ${
                            user.status === "banned"
                              ? "bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500/20"
                              : "bg-orange-500/10 border border-orange-500/30 text-orange-500 hover:bg-orange-500/20"
                          }`}
                          title={
                            user.status === "banned" ? "Unban User" : "Ban User"
                          }
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setUserToDelete(user);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/20 transition-all"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
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
                className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-md w-full p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-[#E8D7B5]">
                    Change User Role
                  </h3>
                  <button
                    onClick={() => {
                      setShowRoleModal(false);
                      setSelectedUser(null);
                    }}
                    className="w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-3 p-4 bg-[#101010] rounded-lg border border-[#D4AF37]/20 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#C9A961] rounded-full flex items-center justify-center">
                      <span className="text-[#101010] font-bold">
                        {selectedUser.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#E8D7B5] font-semibold">
                        {selectedUser.name}
                      </p>
                      <p className="text-[#D4AF37]/70 text-sm">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>

                  <p className="text-[#D4AF37]/70 text-sm mb-4">
                    Select a new role for this user:
                  </p>

                  <div className="space-y-3">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.id}
                          onClick={() =>
                            handleChangeRole(selectedUser.id, role.id)
                          }
                          className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                            selectedUser.role === role.id
                              ? "border-[#D4AF37] bg-[#D4AF37]/10"
                              : "border-[#D4AF37]/20 bg-[#101010] hover:border-[#D4AF37]/50"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 ${role.bgColor} rounded-lg flex items-center justify-center`}
                          >
                            <Icon className={`w-5 h-5 ${role.color}`} />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-[#E8D7B5] font-semibold">
                              {role.label}
                            </p>
                            <p className="text-[#D4AF37]/60 text-xs">
                              {role.id === "admin" && "Full system access"}
                              {role.id === "moderator" && "Content management"}
                              {role.id === "customer" && "Standard user"}
                            </p>
                          </div>
                          {selectedUser.role === role.id && (
                            <Check className="w-5 h-5 text-[#D4AF37]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
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
                className="bg-[#1A1A1A] border-2 border-red-500/30 rounded-2xl max-w-md w-full p-6"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
                    Delete User?
                  </h3>
                  <p className="text-[#D4AF37]/70">
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
                    className="flex-1 px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteUser(userToDelete.id)}
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

export default AdminUsers;
