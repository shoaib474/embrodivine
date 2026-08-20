import React, { useState } from "react";
import { User, Lock, Bell, Mail, Trash2, Save } from "lucide-react";
import DeleteAccountModal from "../components/DeleteAccountModal";
import UpdatePasswordModal from "../components/UpdatePasswordModal";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#222222]">Account Settings</h2>
        <p className="text-slate-500 mt-2">
          Manage your account preferences and security settings.
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile */}
        <div className="bg-[#F5F7FA] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-[#007BFF]" />
            <h3 className="font-bold text-[#222222]">Profile Information</h3>
          </div>

          <p className="text-slate-600 text-sm">
            Update your personal information from the profile page.
          </p>
        </div>

        {/* Password */}
        <div className="bg-[#F5F7FA] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-5 h-5 text-[#007BFF]" />
            <h3 className="font-bold text-[#222222]">Change Password</h3>
          </div>

          <button
            onClick={() => setShowUpdateModal(true)}
            className="px-5 py-2.5 rounded-xl bg-[#007BFF] text-white font-medium hover:bg-[#0066CC] transition-all"
          >
            Update Password
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-[#F5F7FA] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-[#007BFF]" />
            <h3 className="font-bold text-[#222222]">Notifications</h3>
          </div>

          <div className="space-y-5">
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#333333]">
                  Email Notifications
                </p>
                <p className="text-sm text-slate-500">
                  Receive account activity emails.
                </p>
              </div>

              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 accent-[#007BFF]"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#333333]">Order Updates</p>
                <p className="text-sm text-slate-500">
                  Get notified when order status changes.
                </p>
              </div>

              <input
                type="checkbox"
                checked={orderUpdates}
                onChange={() => setOrderUpdates(!orderUpdates)}
                className="w-5 h-5 accent-[#007BFF]"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#333333]">Newsletter</p>
                <p className="text-sm text-slate-500">
                  Receive offers and promotions.
                </p>
              </div>

              <input
                type="checkbox"
                checked={newsletter}
                onChange={() => setNewsletter(!newsletter)}
                className="w-5 h-5 accent-[#007BFF]"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#007BFF] text-white font-semibold hover:bg-[#0066CC] transition-all">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>

        {/* Danger Zone */}
        <div className="border border-red-200 bg-red-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <Trash2 className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-red-600">Danger Zone</h3>
          </div>

          <p className="text-red-500 text-sm mb-4">
            Deleting your account is permanent and cannot be undone.
          </p>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-5 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all"
          >
            Delete Account
          </button>
        </div>
      </div>
      <DeleteAccountModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
      <UpdatePasswordModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      />
    </div>
  );
};

export default Settings;
