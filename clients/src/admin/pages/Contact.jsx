import React, { useState, useEffect, useMemo } from "react";
import {
  Mail,
  Search,
  Eye,
  Trash2,
  Reply,
  Archive,
  Clock,
  CheckCircle,
  X,
  Send,
  User,
  Phone,
  Calendar,
  AlertCircle,
  MailOpen,
  Inbox,
  Tag,
  Edit,
} from "lucide-react";
import {
  useContacts,
  useDeleteContact,
  useReplyToContact,
  useSingleContact,
  useUpdateContactStatus,
} from "../../hooks/useContact";
import toast from "react-hot-toast";

const AdminContact = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedMessages, setSelectedMessages] = useState(new Set());
  const [localMessages, setLocalMessages] = useState([]);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusValue, setStatusValue] = useState("new");

  const { data: singleContactData, isLoading: singleLoading } =
    useSingleContact(selectedContactId);

  const { data, loading } = useContacts();
  const { mutate, isPending } = useDeleteContact();
  const { mutate: updateStatusMutate, isPending: statusUpdating } =
    useUpdateContactStatus();
  const { mutate: replyMutate, isPending: replying } = useReplyToContact();

  // Support both array and object response shapes
  const rawMessages =
    localMessages.length > 0 ? localMessages : data?.contacts || data || [];

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return d.toLocaleDateString("en-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString("en-PK", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const normalise = (msg) => ({
    ...msg,
    id: msg._id,
    date: formatDate(msg.createdAt),
    time: formatTime(msg.createdAt),
    // Map "new" → "unread" so badges still work
    displayStatus: msg.status === "new" ? "unread" : msg.status,
    // No priority / category in API → fallback gracefully
    priority: msg.priority || null,
    category: msg.category || null,
  });

  const messages = rawMessages.map(normalise);

  // ─── Stats ─────────────────────────────────────────────────────────────────

  const stats = [
    {
      label: "Total Messages",
      value: messages.length,
      icon: Mail,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Unread / New",
      value: messages.filter(
        (m) => m.status === "new" || m.status === "unread" || !m.isRead,
      ).length,
      icon: Inbox,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      label: "Replied",
      value: messages.filter((m) => m.status === "replied").length,
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Archived",
      value: messages.filter((m) => m.status === "archived").length,
      icon: Archive,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  // ─── Filter ────────────────────────────────────────────────────────────────

  const filteredMessages = messages.filter((msg) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.subject?.toLowerCase().includes(q);

    let matchesStatus = true;
    if (statusFilter !== "all") {
      if (statusFilter === "unread") {
        matchesStatus =
          msg.status === "new" || msg.status === "unread" || !msg.isRead;
      } else {
        matchesStatus = msg.status === statusFilter;
      }
    }

    return matchesSearch && matchesStatus;
  });

  // ─── Local state mutations (optimistic UI) ─────────────────────────────────

  const updateMessage = (id, patch) =>
    setLocalMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, ...patch } : m)),
    );

  const handleStatusUpdate = () => {
    if (!selectedMessage?._id) return;

    updateStatusMutate(
      {
        id: selectedMessage._id,
        status: statusValue,
      },
      {
        onSuccess: () => {
          toast.success("Status updated successfully");

          updateMessage(selectedMessage._id, {
            status: statusValue,
            repliedAt:
              statusValue === "resolved"
                ? new Date().toISOString()
                : selectedMessage.repliedAt,
          });

          setShowStatusModal(false);
          setSelectedMessage(null);
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to update status",
          );
        },
      },
    );
  };

  const removeMessage = (id) =>
    setLocalMessages((prev ?? messages).filter((m) => m._id !== id));

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleSelectMessage = (msgId) => {
    setSelectedMessages((prev) => {
      const next = new Set(prev);
      next.has(msgId) ? next.delete(msgId) : next.add(msgId);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedMessages.size === filteredMessages.length) {
      setSelectedMessages(new Set());
    } else {
      setSelectedMessages(new Set(filteredMessages.map((m) => m._id)));
    }
  };

  const handleViewMessage = (message) => {
    setSelectedContactId(message._id); // backend call
    setShowViewModal(true);
  };

  const handleSendReply = (id) => {
    if (!replyText.trim()) return;

    replyMutate(
      {
        id,
        replyText,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Reply sent successfully");
          setReplyText("");
          setShowReplyModal(false);
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Failed to send reply");
        },
      },
    );
  };

  const handleDelete = (contactId) => {
    mutate(contactId, {
      onSuccess: () => {
        toast.success("Deleted Successfully");
        setShowDeleteModal(false);
        setShowViewModal(false);
        setSelectedMessage(null);
      },
    });
  };

  const handleArchive = (msgId) => {
    updateMessage(msgId, { status: "archived" });
  };

  const getStatusBadge = (msg) => {
    const s = msg.status || "new";

    const map = {
      new: {
        icon: Mail,
        label: "New",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
      },
      in_progress: {
        icon: Clock,
        label: "In Progress",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
      },
      resolved: {
        icon: CheckCircle,
        label: "Resolved",
        color: "text-green-500",
        bg: "bg-green-500/10",
      },
    };

    const cfg = map[s] || map.new;
    const Icon = cfg.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.color}`}
      >
        <Icon className="w-3 h-3" />
        {cfg.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    if (!priority) return null;
    const map = {
      low: "bg-green-500/20 text-green-400 border border-green-500/30",
      medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
      high: "bg-red-500/20 text-red-400 border border-red-500/30",
    };
    const cls =
      map[priority?.toLowerCase()] ||
      "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
        {priority}
      </span>
    );
  };

  const selectedMessag = singleContactData?.contact;

  return (
    <div className="min-h-screen bg-[#101010] p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-2">
            Contact Messages
          </h1>
          <p className="text-[#D4AF37]/70">
            Manage customer inquiries and support requests
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6"
              >
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-[#D4AF37]/70 text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#E8D7B5]">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
              <input
                type="text"
                placeholder="Search by name, email or subject…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread / New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Messages Table */}
        <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-[#D4AF37]/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={
                    selectedMessages.size === filteredMessages.length &&
                    filteredMessages.length > 0
                  }
                  onChange={handleSelectAll}
                  className="w-5 h-5 rounded accent-[#D4AF37]"
                />
                <span className="text-[#E8D7B5] font-semibold">
                  {selectedMessages.size > 0
                    ? `${selectedMessages.size} selected`
                    : `${filteredMessages.length} messages`}
                </span>
              </div>
              {selectedMessages.size > 0 && (
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/20 text-sm font-semibold flex items-center gap-2">
                    <Archive className="w-4 h-4" /> Archive
                  </button>
                  <button className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 text-sm font-semibold flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="p-12 text-center text-[#D4AF37]/60">
              Loading messages…
            </div>
          )}

          {/* Empty */}
          {!loading && filteredMessages.length === 0 && (
            <div className="p-12 text-center text-[#D4AF37]/60">
              No messages found.
            </div>
          )}

          {/* Message Rows */}
          <div className="divide-y divide-[#D4AF37]/10">
            {filteredMessages.map((message) => (
              <div
                key={message._id}
                className={`p-6 hover:bg-[#D4AF37]/5 cursor-pointer transition-colors ${
                  !message.isRead || message.status === "new"
                    ? "bg-[#D4AF37]/5"
                    : ""
                }`}
                onClick={() => handleViewMessage(message)}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedMessages.has(message._id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectMessage(message._id);
                    }}
                    className="w-5 h-5 rounded accent-[#D4AF37] mt-1"
                  />

                  <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3
                            className={`font-semibold ${
                              !message.isRead || message.status === "new"
                                ? "text-[#E8D7B5]"
                                : "text-[#D4AF37]"
                            }`}
                          >
                            {message.name}
                          </h3>
                          {getPriorityBadge(message.priority)}
                        </div>
                        <p className="text-[#D4AF37]/70 text-sm">
                          {message.email}
                        </p>
                        {message.phone && (
                          <p className="text-[#D4AF37]/50 text-xs mt-0.5 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {message.phone}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        {getStatusBadge(message)}
                      </div>
                    </div>

                    {/* Subject */}
                    <h4
                      className={`mb-2 ${
                        !message.isRead || message.status === "new"
                          ? "text-[#E8D7B5] font-semibold"
                          : "text-[#D4AF37]"
                      }`}
                    >
                      {message.subject}
                    </h4>

                    {/* Snippet */}
                    <p className="text-[#D4AF37]/70 text-sm line-clamp-2 mb-3">
                      {message.message}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-[#D4AF37]/60 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {message.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {message.time}
                        </span>
                        {message.repliedAt && (
                          <span className="flex items-center gap-1 text-green-500/70">
                            <CheckCircle className="w-3 h-3" />
                            Replied {formatDate(message.repliedAt)}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div
                        className="flex gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setSelectedMessage(message);
                            setShowViewModal(true);
                          }}
                          className="p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMessage(message);
                            setShowReplyModal(true);
                          }}
                          className="p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/20"
                          title="Reply"
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleArchive(message._id)}
                          className="p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-500 hover:bg-blue-500/20"
                          title="Archive"
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMessage(message);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 hover:bg-red-500/20"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedMessage(message);
                            setStatusValue(message.status || "new");
                            setShowStatusModal(true);
                          }}
                          className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-500 hover:bg-yellow-500/20"
                          title="Update Status"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── View Modal ─────────────────────────────────────────────────────── */}
        {showViewModal && selectedMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between sticky top-0 bg-[#1A1A1A] z-10">
                <h3 className="text-2xl font-bold text-[#E8D7B5]">
                  Message Details
                </h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Sender Info */}
                <div className="bg-[#101010] rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#C9A961] rounded-full flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-[#101010]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#E8D7B5] font-semibold">
                        {selectedMessage.name}
                      </h4>
                      <p className="text-[#D4AF37]/70 text-sm">
                        {selectedMessage.email}
                      </p>
                    </div>
                    <div className="flex gap-2 items-center flex-wrap">
                      {getStatusBadge(selectedMessage)}
                      {getPriorityBadge(selectedMessage.priority)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-[#D4AF37]/70">
                      <Phone className="w-4 h-4" />
                      {selectedMessage.phone || "—"}
                    </div>
                    <div className="flex items-center gap-2 text-[#D4AF37]/70">
                      <Calendar className="w-4 h-4" />
                      {selectedMessage.date} at {selectedMessage.time}
                    </div>
                  </div>
                  {selectedMessage.repliedAt && (
                    <div className="flex items-center gap-2 text-green-500/70 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Replied on {formatDate(selectedMessage.repliedAt)}
                    </div>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[#D4AF37]/70 text-sm mb-2">
                    Subject
                  </label>
                  <h4 className="text-[#E8D7B5] text-xl font-semibold">
                    {selectedMessage.subject}
                  </h4>
                </div>

                {/* Category (optional) */}
                {selectedMessage.category && (
                  <div>
                    <label className="block text-[#D4AF37]/70 text-sm mb-2">
                      Category
                    </label>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-semibold">
                      <Tag className="w-4 h-4" />
                      {selectedMessage.category}
                    </span>
                  </div>
                )}

                {/* Message body */}
                <div>
                  <label className="block text-[#D4AF37]/70 text-sm mb-2">
                    Message
                  </label>
                  <div className="bg-[#101010] rounded-lg p-4 border border-[#D4AF37]/20">
                    <p className="text-[#E8D7B5] leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setShowReplyModal(true);
                    }}
                    className="flex-1 px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] flex items-center justify-center gap-2"
                  >
                    <Reply className="w-5 h-5" /> Reply to Message
                  </button>
                  <button
                    onClick={() => handleArchive(selectedMessage._id)}
                    className="px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Reply Modal ────────────────────────────────────────────────────── */}
        {showReplyModal && selectedMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#E8D7B5]">
                  Reply to {selectedMessage.name}
                </h3>
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyText("");
                  }}
                  className="w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-[#101010] rounded-lg p-4 border border-[#D4AF37]/20">
                  <p className="text-[#D4AF37]/70 text-sm mb-2">
                    Original Message:
                  </p>
                  <p className="text-[#E8D7B5] text-sm">
                    {selectedMessage.message}
                  </p>
                </div>

                <div>
                  <label className="block text-[#D4AF37]/70 text-sm mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here…"
                    rows={8}
                    className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowReplyModal(false);
                      setReplyText("");
                    }}
                    className="flex-1 px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSendReply(selectedMessage._id)}
                    disabled={replying}
                    className="flex-1 px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] flex items-center justify-center gap-2"
                  >
                    {replying ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Send Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Modal ───────────────────────────────────────────────────── */}
        {showDeleteModal && selectedMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] border-2 border-red-500/30 rounded-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
                  Delete Message?
                </h3>
                <p className="text-[#D4AF37]/70">
                  Are you sure you want to delete this message from{" "}
                  <span className="text-[#E8D7B5] font-semibold">
                    {selectedMessage.name}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedMessage(null);
                  }}
                  className="flex-1 px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  disabled={isPending}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showStatusModal && selectedMessage && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#E8D7B5]">
                  Update Status
                </h3>

                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedMessage(null);
                  }}
                  className="w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-[#D4AF37]/70 mb-2">
                  Customer:
                  <span className="text-[#E8D7B5] font-semibold ml-2">
                    {selectedMessage.name}
                  </span>
                </p>

                <p className="text-[#D4AF37]/70 text-sm">
                  Subject:
                  <span className="text-[#E8D7B5] ml-2">
                    {selectedMessage.subject}
                  </span>
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-[#D4AF37]/70 text-sm mb-2">
                  Select New Status
                </label>

                <select
                  value={statusValue}
                  onChange={(e) => setStatusValue(e.target.value)}
                  className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedMessage(null);
                  }}
                  className="flex-1 px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10"
                >
                  Cancel
                </button>

                <button
                  onClick={handleStatusUpdate}
                  disabled={statusUpdating}
                  className="flex-1 px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5]"
                >
                  {statusUpdating ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;
