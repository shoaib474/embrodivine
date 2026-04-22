import { Menu, Bell, Search, User } from "lucide-react";

const AdminHeader = ({ setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-[#1A1A1A] to-[#0E0E0E] border-b border-[#D4AF37]/30 shadow-[0_4px_20px_rgba(212,175,55,0.05)]">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#D4AF37]/10 transition"
          >
            <Menu className="w-6 h-6 text-[#D4AF37]" />
          </button>

          {/* Brand */}
          <h1 className="hidden sm:block text-2xl font-bold tracking-wide text-[#E8D7B5]">
            Admin<span className="text-[#D4AF37]">Panel</span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-[#D4AF37]/10 transition">
            <Bell className="w-5 h-5 text-[#D4AF37]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8962E] flex items-center justify-center">
              <User className="w-5 h-5 text-[#101010]" />
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-semibold text-[#E8D7B5]">Admin</p>
              <p className="text-xs text-[#D4AF37]/60">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
