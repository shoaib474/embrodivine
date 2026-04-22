import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FileText,
  Search,
  Download,
  Trash2,
  Calendar,
  Filter,
  ChevronDown,
  Eye,
  MessageCircle,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

import Loader from "../components/Loader";

import {
  useDeleteQuote,
  useDeleteSelectedQuotes,
  useQuotes,
  useUpdateQuoteStatus,
} from "../../hooks/useQuote";

const QuoteRequests = () => {
  const { data, isLoading } = useQuotes();
  const { mutate: deleteQuote } = useDeleteQuote();
  const { mutate: updateStatus } = useUpdateQuoteStatus();
  const { mutate: deleteSelectedQuotes, isPending } = useDeleteSelectedQuotes();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [viewingQuote, setViewingQuote] = useState(null);

  const quotes = data?.data || data || [];

  const handleDeleteSelected = () => {
    if (selectedQuotes.length === 0) {
      toast.error("No quotes selected");
      return;
    }

    deleteSelectedQuotes(selectedQuotes, {
      onSuccess: () => {
        toast.success("Selected quotes deleted 🧹");
        setSelectedQuotes([]); // clear selection
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Delete failed");
      },
    });
  };

  const filteredQuotes = quotes.filter((item) => {
    const matchesSearch =
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectQuote = (id) => {
    setSelectedQuotes((prev) =>
      prev.includes(id)
        ? prev.filter((quoteId) => quoteId !== id)
        : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedQuotes.length === filteredQuotes.length) {
      setSelectedQuotes([]);
    } else {
      setSelectedQuotes(filteredQuotes.map((item) => item._id));
    }
  };

  const handleExport = () => {
    const csvContent = [
      [
        "ID",
        "Customer",
        "Email",
        "Phone",
        "Project Type",
        "Quantity",
        "Budget",
        "timeline",
        "Status",
        "Submitted At",
      ],
      ...filteredQuotes.map((item) => [
        item._id,
        item.customerName,
        item.email,
        item.phone,
        item.projectType,
        item.quantity,
        item.budget,
        item.timeline,
        item.status,
        item.createdAt,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote-requests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-500",
      quoted: "bg-blue-500/20 text-blue-500",
      completed: "bg-green-500/20 text-green-500",
      rejected: "bg-red-500/20 text-red-500",
    };
    return colors[status] || "bg-gray-500/20 text-gray-500";
  };

  const stats = {
    total: quotes.length,
    pending: quotes.filter((q) => q.status === "pending").length,
    quoted: quotes.filter((q) => q.status === "quoted").length,
    completed: quotes.filter((q) => q.status === "completed").length,
    rejected: quotes.filter((q) => q.status === "rejected").length,
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#101010] p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/30">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#E8D7B5]">
                Quote Requests
              </h1>
              <p className="text-[#D4AF37]/70 text-sm">
                Manage custom embroidery quote requests
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#D4AF37]/70 text-xs font-medium">Total</p>
              <FileText className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <p className="text-2xl font-bold text-[#E8D7B5]">{stats.total}</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#D4AF37]/70 text-xs font-medium">Pending</p>
              <Clock className="w-4 h-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-[#E8D7B5]">{stats.pending}</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#D4AF37]/70 text-xs font-medium">Quoted</p>
              <DollarSign className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-[#E8D7B5]">{stats.quoted}</p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#D4AF37]/70 text-xs font-medium">Completed</p>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-[#E8D7B5]">
              {stats.completed}
            </p>
          </div>

          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#D4AF37]/70 text-xs font-medium">Rejected</p>
              <XCircle className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-[#E8D7B5]">
              {stats.rejected}
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
                  placeholder="Search by name, email, or project type..."
                  className="w-full pl-10 pr-4 py-2 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder:text-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Filter Button */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterMenu(!showFilterMenu)}
                  className="px-4 py-2 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all flex items-center gap-2 min-w-[140px]"
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
                        setFilterStatus("quoted");
                        setShowFilterMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      Quoted
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus("completed");
                        setShowFilterMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      Completed
                    </button>
                    <button
                      onClick={() => {
                        setFilterStatus("rejected");
                        setShowFilterMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      Rejected
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
            {selectedQuotes.length > 0 && (
              <div className="mt-4 flex items-center gap-3 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg">
                <span className="text-[#E8D7B5] text-sm font-medium">
                  {selectedQuotes.length} selected
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
                        selectedQuotes.length === filteredQuotes.length &&
                        filteredQuotes.length > 0
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-[#D4AF37]/30 bg-[#1A1A1A] text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Project
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    timeline
                  </th>
                  <th className="px-4 py-3 text-left text-[#D4AF37] text-sm font-semibold">
                    Color
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
                {filteredQuotes.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-[#D4AF37]/10 hover:bg-[#D4AF37]/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedQuotes.includes(item._id)}
                        onChange={() => handleSelectQuote(item._id)}
                        className="w-4 h-4 rounded border-[#D4AF37]/30 bg-[#1A1A1A] text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-[#E8D7B5] font-medium">
                          {item.customerName}
                        </p>
                        <p className="text-[#D4AF37]/50 text-xs">
                          {item.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-[#E8D7B5] text-sm">
                        {item.projectType}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-[#D4AF37]/70 text-sm">
                      {item.quantity} pcs
                    </td>
                    <td className="px-4 py-3 text-[#D4AF37]/70 text-sm">
                      {item.budget}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-[#D4AF37]/70 text-xs">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.timeline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold uppercase">
                        {item.colors}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          updateStatus({ id: item._id, status: e.target.value })
                        }
                        className="bg-[#101010] text-[#E8D7B5] border border-[#D4AF37]/30 rounded px-2 py-1"
                      >
                        <option value="pending">Pending</option>
                        <option value="quoted">Quoted</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewingQuote(item)}
                          className="p-2 hover:bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteQuote(item._id)}
                          className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredQuotes.length === 0 && (
            <div className="py-12 text-center">
              <FileText className="w-12 h-12 text-[#D4AF37]/30 mx-auto mb-3" />
              <p className="text-[#D4AF37]/70">No quote requests found</p>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-sm text-[#D4AF37]/70">
            <span>
              Showing {filteredQuotes.length} of {quotes.length} requests
            </span>
            <span>Last updated: Just now</span>
          </div>
        </div>
      </div>

      {/* View Quote Modal */}
      {viewingQuote && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 p-6 border-b border-[#D4AF37]/60 bg-[#1A1A1A]">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold text-[#E8D7B5]">
                  Quote Request Details
                </h2>
                <button
                  onClick={() => setViewingQuote(null)}
                  className="w-8 h-8 rounded-lg bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all flex items-center justify-center"
                >
                  ×
                </button>
              </div>
              <p className="text-[#D4AF37]/70 text-sm">
                Request #{viewingQuote._id}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-[#E8D7B5] font-semibold mb-3">
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                    <p className="text-[#D4AF37]/60 text-xs mb-1">Name</p>
                    <p className="text-[#E8D7B5] font-medium">
                      {viewingQuote.customerName}
                    </p>
                  </div>
                  <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                    <p className="text-[#D4AF37]/60 text-xs mb-1">Email</p>
                    <p className="text-[#E8D7B5] font-medium">
                      {viewingQuote.email}
                    </p>
                  </div>
                  <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                    <p className="text-[#D4AF37]/60 text-xs mb-1">Phone</p>
                    <p className="text-[#E8D7B5] font-medium">
                      {viewingQuote.phone}
                    </p>
                  </div>
                  <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                    <p className="text-[#D4AF37]/60 text-xs mb-1">Submitted</p>
                    <p className="text-[#E8D7B5] font-medium">
                      {viewingQuote.createdAt.slice(0, 10)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-[#E8D7B5] font-semibold mb-3">
                  Project Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                    <p className="text-[#D4AF37]/60 text-xs mb-1">
                      Project Type
                    </p>
                    <p className="text-[#E8D7B5] font-medium">
                      {viewingQuote.projectType}
                    </p>
                  </div>
                  <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                    <p className="text-[#D4AF37]/60 text-xs mb-1">Quantity</p>
                    <p className="text-[#E8D7B5] font-medium">
                      {viewingQuote.quantity} pieces
                    </p>
                  </div>
                  <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                    <p className="text-[#D4AF37]/60 text-xs mb-1">Budget</p>
                    <p className="text-[#E8D7B5] font-medium">
                      {viewingQuote.budget}
                    </p>
                  </div>
                  <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                    <p className="text-[#D4AF37]/60 text-xs mb-1">timeline</p>
                    <p className="text-[#E8D7B5] font-medium">
                      {new Date(viewingQuote.timeline).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        },
                      )}
                    </p>
                  </div>
                </div>
                <div className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3">
                  <p className="text-[#D4AF37]/60 text-xs mb-2">Description</p>
                  <p className="text-[#E8D7B5] leading-relaxed">
                    {viewingQuote.description}
                  </p>
                </div>
              </div>

              {/* Status & Colors */}
              <div>
                <h3 className="text-[#E8D7B5] font-semibold mb-3">Status</h3>
                <div className="flex gap-3">
                  <span
                    className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize ${getStatusColor(viewingQuote.status)}`}
                  >
                    {viewingQuote.status}
                  </span>
                  <span className="px-4 py-2 rounded-lg text-sm font-semibold uppercase">
                    {viewingQuote.colors} colors
                  </span>
                </div>
              </div>

              {/* Attachments */}
              {viewingQuote.attachments?.length > 0 && (
                <div>
                  <h3 className="text-[#E8D7B5] font-semibold mb-3">
                    Attachments
                  </h3>
                  <div className="space-y-2">
                    {viewingQuote.attachments.map((file, idx) => (
                      <div
                        key={file._id || idx}
                        className="bg-[#101010] border border-[#D4AF37]/20 rounded-lg p-3 flex items-center justify-between gap-4"
                      >
                        {/* Image preview */}
                        {file.url.match(/\.(jpeg|jpg|png|gif|webp)$/i) ? (
                          <img
                            src={file.url}
                            alt={`Attachment ${idx + 1}`}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-[#E8D7B5] text-sm">
                            {file.url}
                          </span>
                        )}

                        {/* Download Button */}
                        <a
                          href={file.url}
                          download
                          className="text-[#D4AF37] hover:text-[#E8D7B5] text-sm font-semibold"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] transition-all flex items-center justify-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Send Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteRequests;
