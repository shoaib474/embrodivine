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
    <div className="min-h-screen bg-[#101010] pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-[#1A1A1A] border border-yellow-500/20 rounded-xl p-6 space-y-6 sticky top-24">
              {/* Profile */}
              <div className="text-center pb-6 border-b border-yellow-500/20">
                <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-[#101010]">
                  {userData.name
                    ? userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "U"}
                </div>

                <h3 className="text-lg font-bold text-white">
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="hover:text-yellow-500 transition-colors"
                    >
                      {userData.name} (Admin)
                    </Link>
                  ) : (
                    <span>{userData.name || "User"}</span>
                  )}
                </h3>

                <p className="text-sm text-yellow-500/70">
                  {userData.email || "user@example.com"}
                </p>
                <p className="text-xs text-yellow-500/50 mt-2">
                  Member since{" "}
                  {userData.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#101010] rounded-lg">
                  <span className="text-yellow-500/70 text-sm">
                    Total Orders
                  </span>
                  <span className="text-white font-bold">
                    {userData.totalOrders || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#101010] rounded-lg">
                  <span className="text-yellow-500/70 text-sm">Total Spent</span>
                  <span className="text-white font-bold">
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
                          ? "bg-yellow-500 text-[#101010]"
                          : "text-yellow-500 hover:bg-yellow-500/10"
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
