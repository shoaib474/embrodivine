import React, { useState, useEffect } from "react";
import {
  Mail,
  Search,
  Download,
  Trash2,
  Calendar,
  Filter,
  ChevronDown,
  CheckCircle,
  Copy,
} from "lucide-react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const NotifyEmails = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(null);

  // Sample data
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);

  // ------------------ Fetch Emails ------------------
  const fetchEmails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/notify`, {
        withCredentials: true,
      });
      setEmails(res.data.data); // update state with fetched emails
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this email?"
      );
      if (!confirmDelete) return;

      const res = await axios.delete(`${API}/api/notify/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        // Remove deleted email from state
        setEmails((prev) => prev.filter((email) => email._id !== id));
        alert(res.data.message);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Something went wrong while deleting the email.");
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedEmails.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedEmails.length} email(s)?`
    );
    if (!confirmDelete) return;

    try {
      const res = await axios.post(
        `${API}/api/notify/delete-selected`,
        { ids: selectedEmails },
        { withCredentials: true }
      );

      if (res.data.success) {
        // Remove deleted emails from state
        setEmails((prev) =>
          prev.filter((email) => !selectedEmails.includes(email._id))
        );
        setSelectedEmails([]);
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while deleting selected emails");
    }
  };

  const filteredEmails = emails.filter((item) => {
    const matchesSearch = item.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || item.notifyStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectEmail = (id) => {
    setSelectedEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map((item) => item.id));
    }
  };

  const handleExport = () => {
    const csvContent = [
      ["Email", "Submitted At", "Status"],
      ...filteredEmails.map((item) => [
        item.email,
        item.createdAt,
        item.notifyStatus,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notify-emails-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const stats = {
    total: emails.length,
    pending: emails.filter((e) => e.notifyStatus === "pending").length,
    contacted: emails.filter((e) => e.notifyStatus === "contacted").length,
  };

  return (
    <div className="min-h-screen bg-[#101010] p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/30">
              <Mail className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#E8D7B5]">
                Notify Emails
              </h1>
              <p className="text-[#D4AF37]/70 text-sm">
                Manage checkout notification requests
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#D4AF37]/70 text-sm font-medium">
                Total Emails
              </p>
              <Mail className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <p className="text-3xl font-bold text-[#E8D7B5]">{stats.total}</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#D4AF37]/70 text-sm font-medium">Pending</p>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-bold text-[#E8D7B5]">{stats.pending}</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#D4AF37]/70 text-sm font-medium">Contacted</p>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-[#E8D7B5]">
              {stats.contacted}
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
          {/* Toolbar */}
          <div className="p-4 border-b border-[#D4AF37]/20">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by email..."
                  className="w-full pl-10 pr-4 py-2 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder:text-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Filter Button */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="px-4 py-2 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all flex items-center gap-2 min-w-[120px]"
                >
                  <Filter className="w-5 h-5" />
                  <span className="capitalize">{filterStatus}</span>
                  <ChevronDown className="w-4 h-4 ml-auto" />
                </button>

                {showFilterMenu && (
                  <div className="absolute top-full mt-2 right-0 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-lg shadow-xl overflow-hidden z-10 min-w-[150px]">
                    <button
                      onClick={() => {
                        setFilterStatus("all");
                        setShowFilterMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      All
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus("pending");
                        setShowFilterMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus("contacted");
                        setShowFilterMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      Contacted
                    </button>
                  </div>
                )}
              </div>

              {/* Export Button */}
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>

            {/* Bulk Actions */}
            {selectedEmails.length > 0 && (
              <div className="mt-4 flex items-center gap-3 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg">
                <span className="text-[#E8D7B5] text-sm font-medium">
                  {selectedEmails.length} selected
                </span>
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-1 bg-red-500/20 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-500/30 transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#101010]">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedEmails.length === filteredEmails.length &&
                        filteredEmails.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-[#D4AF37]/30 bg-[#1A1A1A] text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Submitted At
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmails.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-[#D4AF37]/10 hover:bg-[#D4AF37]/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(item._id)}
                        onChange={() => handleSelectEmail(item._id)}
                        className="w-4 h-4 rounded border-[#D4AF37]/30 bg-[#1A1A1A] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#E8D7B5] font-medium">
                          {item.email}
                        </span>
                        <button
                          onClick={() => handleCopyEmail(item.email)}
                          className="p-1 hover:bg-[#D4AF37]/10 rounded transition-colors"
                          title="Copy email"
                        >
                          {copiedEmail === item.email ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4 text-[#D4AF37]/50" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-[#D4AF37]/70 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.notifyStatus === "pending"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : "bg-green-500/20 text-green-500"
                        }`}
                      >
                        {item.notifyStatus}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredEmails.length === 0 && (
            <div className="py-12 text-center">
              <Mail className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-3" />
              <p className="text-[#D4AF37]/70">No emails found</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-sm text-[#D4AF37]/70">
            <span>
              Showing {filteredEmails.length} of {emails.length} emails
            </span>
            <span>Last updated: Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifyEmails;
