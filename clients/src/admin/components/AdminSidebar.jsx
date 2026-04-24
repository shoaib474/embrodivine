import {
  LayoutDashboard,
  Package,
  FileText,
  ShoppingCart,
  LogOut,
  X,
  Bell,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", badge: null },
  { id: "orders", icon: ShoppingCart, label: "Orders", badge: null },
  { id: "products", icon: Package, label: "Products", badge: null },
  { id: "notify", icon: Bell, label: "Notify", badge: null },
  { id: "users", icon: User, label: "Users", badge: null },
  { id: "quote", icon: FileText, label: "Quote Requests", badge: null },
];

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  activeMenu,
  setActiveMenu,
}) => {
  const navigate = useNavigate();

  const goToUser = () => navigate("/dashboard");

  const handleLogout = async () => {
    try {
      await axios.post(`${API}/auth/logout`, {}, { withCredentials: true });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-[#1A1A1A] to-[#0C0C0C]
      border-r border-[#D4AF37]/30 transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="flex flex-col h-full">
        {/* LOGO */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#D4AF37]/20">
          <h1 className="text-2xl font-extrabold tracking-wide text-[#E8D7B5]">
            Embro
            <span className="text-[#D4AF37]">divine</span>
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#D4AF37]/10 transition"
          >
            <X className="w-5 h-5 text-[#D4AF37]" />
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <Link
                key={item.id}
                to={item.id === "dashboard" ? "/admin" : `/admin/${item.id}`}
                onClick={() => setActiveMenu(item.id)}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#D4AF37] text-[#101010] shadow-[0_0_20px_rgba(212,175,55,0.5)]"
                      : "text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg transition
                      ${
                        isActive
                          ? "bg-[#101010]/20"
                          : "bg-[#101010] group-hover:bg-[#D4AF37]/10"
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="font-semibold tracking-wide">
                    {item.label}
                  </span>
                </div>

                {item.badge && (
                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-full
                      ${
                        isActive
                          ? "bg-[#101010] text-[#D4AF37]"
                          : "bg-[#D4AF37]/20 text-[#D4AF37]"
                      }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* BOTTOM ACTIONS */}
        <div className="px-4 py-5 border-t border-[#D4AF37]/20 space-y-3">
          <button
            onClick={goToUser}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
            bg-gradient-to-r from-[#D4AF37] to-[#B8962E]
            text-black font-semibold hover:opacity-90 transition"
          >
            <User className="w-5 h-5" />
            Go to User
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
            bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37]
            hover:bg-[#D4AF37]/10 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
