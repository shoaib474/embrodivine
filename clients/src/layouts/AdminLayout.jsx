import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminHeader from "../admin/components/AdminHeader";
import React, { useState } from "react";

const AdminLayout = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex-1 flex flex-col">
        <AdminHeader
          setSidebarOpen={setSidebarOpen}
          notificationOpen={notificationOpen}
          setNotificationOpen={setNotificationOpen}
          notifications
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
