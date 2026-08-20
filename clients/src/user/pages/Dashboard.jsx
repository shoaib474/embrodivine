import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ShoppingBag, Heart, User, Settings } from "lucide-react";

import SpinnerLoader from "../components/SpinnerLoader";

import { useGetProfile, useUpdateProfile } from "../../hooks/useProfile";

// import Orders from "./Orders";
import Favorites from "./Favorites";
import Profile from "./Profile";
import SettingsPage from "./Settings";
import Orders from "./Orders";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { data, isLoading } = useGetProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  const { user, loading } = useAuth();

  if (!user && !isLoading) {
    return <Navigate to="/auth" replace />;
  }

  const [activeTab, setActiveTab] = useState("orders");

  const userData = data?.user || data || [];
  const isAdmin = userData.role === "admin";

  const tabs = [
    { id: "orders", icon: ShoppingBag, label: "My Orders" },
    { id: "favorites", icon: Heart, label: "Favorites" },
    { id: "profile", icon: User, label: "Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const handleUpdateProfile = (updatedData) => {
    if (!updatedData) return;

    updateProfile(updatedData);
  };

  if (isLoading) return <SpinnerLoader />;

  return (
    <div className="min-h-screen bg-[#F5F7FA] pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-6 sticky top-24 shadow-sm">
              {/* Profile */}
              <div className="text-center pb-6 border-b border-[#E5E7EB]">
                <div className="w-20 h-20 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                  {userData.name
                    ? userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </div>

                <h3 className="text-lg font-bold text-[#222222]">
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="hover:text-[#007BFF] transition-colors"
                    >
                      {userData.name} (Admin)
                    </Link>
                  ) : (
                    <span>{userData.name || "User"}</span>
                  )}
                </h3>

                <p className="text-sm text-[#007BFF]/80">
                  {userData.email || "user@example.com"}
                </p>
                <p className="text-xs text-[#6B7280] mt-2">
                  Member since{" "}
                  {userData.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                  <span className="text-[#6B7280] text-sm">Total Orders</span>
                  <span className="text-[#222222] font-bold">
                    {userData.totalOrders || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F5F7FA] rounded-lg">
                  <span className="text-[#6B7280] text-sm">Total Spent</span>
                  <span className="text-[#222222] font-bold">
                    ${userData.totalSpent || 0}
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-[#007BFF] text-white"
                          : "text-[#222222] hover:bg-[#007BFF]/10 hover:text-[#007BFF]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {activeTab === "orders" && <Orders />}
            {activeTab === "favorites" && <Favorites />}
            {activeTab === "profile" && (
              <Profile userData={userData} onSave={handleUpdateProfile} />
            )}
            {activeTab === "settings" && <SettingsPage />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
