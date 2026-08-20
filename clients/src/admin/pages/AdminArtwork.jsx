import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  FileImage,
  FileText,
  ChevronDown,
  X,
  Mail,
  Phone,
  Building,
  Ruler,
  Palette,
  Calendar,
  SlidersHorizontal,
  MoreVertical,
  Trash2,
  MessageSquare,
  Send,
  RefreshCw,
  TrendingUp,
  Package,
  Users,
  ArrowUpRight,
  ExternalLink,
  Tag,
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_SUBMISSIONS = [
  {
    id: "ART-001",
    designName: "Alpha Wolf Logo",
    designType: "Logo / Brand",
    status: "pending",
    submittedAt: "2024-06-18T09:30:00Z",
    files: [
      {
        name: "wolf_logo.png",
        size: 2.4,
        type: "image/png",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      },
      { name: "brief.pdf", size: 0.8, type: "application/pdf", url: "" },
    ],
    details: {
      width: "4",
      height: "4",
      colors: "3",
      fabric: "Cotton",
      notes: "Sharp edges, dark background version needed.",
    },
    contact: {
      name: "James Carter",
      email: "james@alphabrands.com",
      phone: "+1 555-0101",
      company: "Alpha Brands Co.",
    },
    adminNote: "",
    quote: "",
  },
  {
    id: "ART-002",
    designName: "Sunrise Floral Patch",
    designType: "Floral / Nature",
    status: "approved",
    submittedAt: "2024-06-17T14:15:00Z",
    files: [
      {
        name: "floral_design.jpg",
        size: 3.1,
        type: "image/jpeg",
        url: "https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=400",
      },
    ],
    details: {
      width: "3",
      height: "3",
      colors: "6",
      fabric: "Polyester",
      notes: "Soft pastel colors preferred.",
    },
    contact: {
      name: "Mia Thompson",
      email: "mia.t@gmail.com",
      phone: "+1 555-0202",
      company: "",
    },
    adminNote: "Approved. Digitizing underway.",
    quote: "45.00",
  },
  {
    id: "ART-003",
    designName: "Thunder Hawks Team Crest",
    designType: "Sports / Team",
    status: "in_review",
    submittedAt: "2024-06-17T08:00:00Z",
    files: [
      {
        name: "hawks_crest.svg",
        size: 0.5,
        type: "image/svg+xml",
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      },
      {
        name: "reference.png",
        size: 1.9,
        type: "image/png",
        url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      },
    ],
    details: {
      width: "6",
      height: "6",
      colors: "5",
      fabric: "Fleece",
      notes: "Team uniform placement on chest.",
    },
    contact: {
      name: "Coach Dan Rivera",
      email: "d.rivera@thunderhawks.org",
      phone: "+1 555-0303",
      company: "Thunder Hawks FC",
    },
    adminNote: "",
    quote: "",
  },
  {
    id: "ART-004",
    designName: "Vintage Script Monogram",
    designType: "Text / Lettering",
    status: "rejected",
    submittedAt: "2024-06-16T16:45:00Z",
    files: [
      {
        name: "monogram_draft.png",
        size: 1.2,
        type: "image/png",
        url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
      },
    ],
    details: {
      width: "2",
      height: "2",
      colors: "2",
      fabric: "Silk",
      notes: "Gold thread if possible.",
    },
    contact: {
      name: "Sophie Lane",
      email: "sophie.lane@mail.com",
      phone: "",
      company: "",
    },
    adminNote: "File resolution too low. Requested resubmission.",
    quote: "",
  },
  {
    id: "ART-005",
    designName: "Geometric Mountain Range",
    designType: "Abstract / Pattern",
    status: "completed",
    submittedAt: "2024-06-15T11:20:00Z",
    files: [
      {
        name: "mountain_geo.png",
        size: 4.2,
        type: "image/png",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400",
      },
    ],
    details: {
      width: "5",
      height: "3",
      colors: "4",
      fabric: "Denim",
      notes: "Back patch for jacket.",
    },
    contact: {
      name: "Ethan Park",
      email: "ethan.park@designco.com",
      phone: "+1 555-0505",
      company: "Design Co.",
    },
    adminNote: "Digitized and dispatched.",
    quote: "78.00",
  },
  {
    id: "ART-006",
    designName: "Phoenix Rising Emblem",
    designType: "Custom Illustration",
    status: "pending",
    submittedAt: "2024-06-18T07:10:00Z",
    files: [
      {
        name: "phoenix.png",
        size: 5.8,
        type: "image/png",
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
      },
    ],
    details: {
      width: "8",
      height: "8",
      colors: "7",
      fabric: "Canvas",
      notes: "Full back placement.",
    },
    contact: {
      name: "Leila Hassan",
      email: "leila@studio.io",
      phone: "+1 555-0606",
      company: "Studio IO",
    },
    adminNote: "",
    quote: "",
  },
];

// ─── Config ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-700 border-amber-200",
    icon: Clock,
    dot: "bg-amber-400",
  },
  in_review: {
    label: "In Review",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    icon: RefreshCw,
    dot: "bg-blue-400",
  },
  approved: {
    label: "Approved",
    color: "bg-green-100 text-green-700 border-green-200",
    icon: CheckCircle2,
    dot: "bg-green-400",
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-100 text-red-700 border-red-200",
    icon: XCircle,
    dot: "bg-red-400",
  },
  completed: {
    label: "Completed",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    icon: CheckCircle2,
    dot: "bg-purple-400",
  },
};

const ALL_STATUSES = [
  "all",
  "pending",
  "in_review",
  "approved",
  "rejected",
  "completed",
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  if (!cfg) return null;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, accent, sub }) => (
  <div className="bg-white rounded-xl border border-[#007BFF]/10 p-5 flex items-start gap-4 hover:shadow-md hover:border-[#007BFF]/25 transition-all">
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accent}`}
    >
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-2xl font-bold text-[#222222]">{value}</p>
      <p className="text-[#333333]/50 text-xs font-medium mt-0.5">{label}</p>
      {sub && (
        <p className="text-[#007BFF] text-xs mt-1 font-semibold">{sub}</p>
      )}
    </div>
  </div>
);

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const DetailModal = ({
  submission,
  onClose,
  onStatusChange,
  onSaveNote,
  onSaveQuote,
}) => {
  const [adminNote, setAdminNote] = useState(submission.adminNote || "");
  const [quote, setQuote] = useState(submission.quote || "");
  const [activeTab, setActiveTab] = useState("files");
  const [imgPreview, setImgPreview] = useState(null);

  const tabs = ["files", "details", "contact", "admin"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl border border-[#007BFF]/20 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-[#007BFF]/10 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-bold text-[#007BFF]/50 uppercase tracking-wider">
                {submission.id}
              </span>
              <StatusBadge status={submission.status} />
            </div>
            <h2 className="text-xl font-bold text-[#222222]">
              {submission.designName}
            </h2>
            <p className="text-[#333333]/50 text-sm mt-0.5">
              {submission.contact.name} ·{" "}
              {new Date(submission.submittedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#F5F7FA] border border-[#007BFF]/15 flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 border-b border-[#007BFF]/10 shrink-0">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-t-lg text-sm font-semibold capitalize transition-all ${
                activeTab === t
                  ? "bg-[#007BFF] text-white"
                  : "text-[#007BFF]/50 hover:text-[#007BFF] hover:bg-[#007BFF]/10"
              }`}
            >
              {t === "admin" ? "Admin" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Files Tab */}
          {activeTab === "files" && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#007BFF]/50 uppercase tracking-wider mb-4">
                {submission.files.length} File
                {submission.files.length > 1 ? "s" : ""}
              </p>
              {submission.files.map((f, i) => {
                const isImg = f.type.startsWith("image/");
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 bg-[#F5F7FA] border border-[#007BFF]/15 rounded-xl p-4"
                  >
                    {/* Thumb */}
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-white border border-[#007BFF]/10 flex items-center justify-center shrink-0">
                      {isImg && f.url ? (
                        <img
                          src={f.url}
                          alt={f.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileText className="w-6 h-6 text-[#007BFF]/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#222222] font-semibold text-sm truncate">
                        {f.name}
                      </p>
                      <p className="text-[#333333]/40 text-xs mt-0.5">
                        {f.size} MB · {f.type.split("/")[1]?.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {isImg && f.url && (
                        <button
                          onClick={() => setImgPreview(f.url)}
                          className="w-8 h-8 rounded-lg bg-white border border-[#007BFF]/20 flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <a
                        href={f.url || "#"}
                        download={f.name}
                        className="w-8 h-8 rounded-lg bg-white border border-[#007BFF]/20 flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF] hover:text-white transition-all"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                );
              })}

              {/* Image lightbox */}
              {imgPreview && (
                <div
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                  onClick={() => setImgPreview(null)}
                >
                  <img
                    src={imgPreview}
                    alt="Preview"
                    className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={() => setImgPreview(null)}
                    className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <p className="text-xs font-bold text-[#007BFF]/50 uppercase tracking-wider mb-4">
                Design Specifications
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: Tag,
                    label: "Design Type",
                    value: submission.details.designType || "—",
                  },
                  {
                    icon: Ruler,
                    label: "Dimensions",
                    value:
                      submission.details.width && submission.details.height
                        ? `${submission.details.width}" × ${submission.details.height}"`
                        : "—",
                  },
                  {
                    icon: Palette,
                    label: "Colors",
                    value: submission.details.colors
                      ? `${submission.details.colors} color(s)`
                      : "—",
                  },
                  {
                    icon: Package,
                    label: "Fabric",
                    value: submission.details.fabric || "—",
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="bg-[#F5F7FA] rounded-xl p-4 border border-[#007BFF]/10"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3.5 h-3.5 text-[#007BFF]/50" />
                      <p className="text-xs text-[#333333]/40 font-semibold uppercase tracking-wider">
                        {label}
                      </p>
                    </div>
                    <p className="text-[#222222] font-semibold text-sm">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
              {submission.details.notes && (
                <div className="bg-[#F5F7FA] rounded-xl p-4 border border-[#007BFF]/10">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#007BFF]/50" />
                    <p className="text-xs text-[#333333]/40 font-semibold uppercase tracking-wider">
                      Customer Notes
                    </p>
                  </div>
                  <p className="text-[#333333] text-sm leading-relaxed">
                    {submission.details.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === "contact" && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#007BFF]/50 uppercase tracking-wider mb-4">
                Customer Information
              </p>
              {[
                {
                  icon: Users,
                  label: "Full Name",
                  value: submission.contact.name,
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: submission.contact.email,
                  isLink: `mailto:${submission.contact.email}`,
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: submission.contact.phone || "—",
                },
                {
                  icon: Building,
                  label: "Company",
                  value: submission.contact.company || "—",
                },
                {
                  icon: Calendar,
                  label: "Submitted",
                  value: new Date(submission.submittedAt).toLocaleString(),
                },
              ].map(({ icon: Icon, label, value, isLink }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 bg-[#F5F7FA] rounded-xl p-4 border border-[#007BFF]/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#007BFF]/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#007BFF]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#333333]/40 font-semibold uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    {isLink ? (
                      <a
                        href={isLink}
                        className="text-[#007BFF] font-semibold text-sm hover:underline flex items-center gap-1"
                      >
                        {value} <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <p className="text-[#222222] font-semibold text-sm">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Admin Tab */}
          {activeTab === "admin" && (
            <div className="space-y-6">
              {/* Status Change */}
              <div>
                <p className="text-xs font-bold text-[#007BFF]/50 uppercase tracking-wider mb-3">
                  Update Status
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => onStatusChange(submission.id, key)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-semibold transition-all ${
                          submission.status === key
                            ? "bg-[#007BFF] text-white border-[#007BFF] shadow-md shadow-[#007BFF]/20"
                            : "bg-[#F5F7FA] text-[#333333] border-[#007BFF]/15 hover:border-[#007BFF]/40"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quote */}
              <div>
                <p className="text-xs font-bold text-[#007BFF]/50 uppercase tracking-wider mb-3">
                  Price Quote (USD)
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#007BFF]/50 font-bold">
                      $
                    </span>
                    <input
                      type="number"
                      value={quote}
                      onChange={(e) => setQuote(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="w-full pl-7 pr-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/25 rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all text-sm"
                    />
                  </div>
                  <button
                    onClick={() => onSaveQuote(submission.id, quote)}
                    className="px-4 py-3 bg-[#007BFF] text-white rounded-lg text-sm font-semibold hover:bg-[#0066CC] transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Save
                  </button>
                </div>
                {submission.quote && (
                  <p className="text-green-600 text-xs mt-1.5 font-semibold">
                    ✓ Current quote: ${submission.quote}
                  </p>
                )}
              </div>

              {/* Admin Note */}
              <div>
                <p className="text-xs font-bold text-[#007BFF]/50 uppercase tracking-wider mb-3">
                  Internal Note
                </p>
                <textarea
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Add an internal note about this submission…"
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/25 rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all resize-none text-sm"
                />
                <button
                  onClick={() => onSaveNote(submission.id, adminNote)}
                  className="mt-2 px-5 py-2.5 bg-[#007BFF] text-white rounded-lg text-sm font-semibold hover:bg-[#0066CC] transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Save Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const AdminArtwork = () => {
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selected, setSelected] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const showToast = (msg, type = "success") => {
    setToastMsg({ msg, type });
    setTimeout(() => setToastMsg(null), 3000);
  };

  // ── Stats ──
  const stats = useMemo(
    () => ({
      total: submissions.length,
      pending: submissions.filter((s) => s.status === "pending").length,
      inReview: submissions.filter((s) => s.status === "in_review").length,
      approved: submissions.filter((s) => s.status === "approved").length,
      completed: submissions.filter((s) => s.status === "completed").length,
    }),
    [submissions],
  );

  const designTypes = useMemo(() => {
    const types = [
      ...new Set(submissions.map((s) => s.details.designType)),
    ].filter(Boolean);
    return ["all", ...types];
  }, [submissions]);

  // ── Filter + Sort ──
  const filtered = useMemo(() => {
    let result = [...submissions];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.designName.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.contact.name.toLowerCase().includes(q) ||
          s.contact.email.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "all")
      result = result.filter((s) => s.status === statusFilter);
    if (typeFilter !== "all")
      result = result.filter((s) => s.details.designType === typeFilter);

    result.sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.submittedAt) - new Date(a.submittedAt);
      if (sortBy === "oldest")
        return new Date(a.submittedAt) - new Date(b.submittedAt);
      if (sortBy === "name") return a.designName.localeCompare(b.designName);
      return 0;
    });

    return result;
  }, [submissions, search, statusFilter, typeFilter, sortBy]);

  // ── Actions ──
  const handleStatusChange = (id, newStatus) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)),
    );
    if (selected?.id === id) setSelected((s) => ({ ...s, status: newStatus }));
    showToast(`Status updated to ${STATUS_CONFIG[newStatus]?.label}`);
  };

  const handleSaveNote = (id, note) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, adminNote: note } : s)),
    );
    if (selected?.id === id) setSelected((s) => ({ ...s, adminNote: note }));
    showToast("Note saved successfully");
  };

  const handleSaveQuote = (id, quote) => {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, quote } : s)),
    );
    if (selected?.id === id) setSelected((s) => ({ ...s, quote }));
    showToast(`Quote $${quote} saved`);
  };

  const handleDelete = (id) => {
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    if (selected?.id === id) setSelected(null);
    setDeleteId(null);
    showToast("Submission deleted", "error");
  };

  const quickStatus = (e, id, status) => {
    e.stopPropagation();
    handleStatusChange(id, status);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* ── Toast ── */}
      {toastMsg && (
        <div
          className={`fixed top-6 right-6 z-[70] flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl border text-sm font-semibold transition-all ${
            toastMsg.type === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-white border-[#007BFF]/20 text-[#222222]"
          }`}
        >
          {toastMsg.type === "error" ? (
            <XCircle className="w-4 h-4 text-red-500" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#007BFF]" />
          )}
          {toastMsg.msg}
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="bg-white rounded-2xl border border-red-200 p-8 max-w-sm w-full text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7 text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-[#222222] mb-2">
              Delete Submission?
            </h3>
            <p className="text-[#333333]/50 text-sm mb-6">
              This action cannot be undone. The submission and all its files
              will be permanently removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 bg-[#F5F7FA] border border-[#007BFF]/20 text-[#333333] rounded-lg font-semibold hover:bg-[#007BFF]/10 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selected && (
        <DetailModal
          submission={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          onSaveNote={handleSaveNote}
          onSaveQuote={handleSaveQuote}
        />
      )}

      {/* ══════════ HEADER ══════════ */}
      <div className="bg-white border-b border-[#007BFF]/10 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#222222]">
              Artwork Submissions
            </h1>
            <p className="text-[#333333]/40 text-xs mt-0.5">
              {filtered.length} of {submissions.length} submissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-lg text-[#007BFF] text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              Admin Panel
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ══════════ STATS ══════════ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard
            label="Total Submissions"
            value={stats.total}
            icon={FileImage}
            accent="bg-[#007BFF]"
          />
          <StatCard
            label="Pending Review"
            value={stats.pending}
            icon={Clock}
            accent="bg-amber-400"
            sub={stats.pending > 0 ? "Needs attention" : undefined}
          />
          <StatCard
            label="In Review"
            value={stats.inReview}
            icon={RefreshCw}
            accent="bg-blue-400"
          />
          <StatCard
            label="Approved"
            value={stats.approved}
            icon={CheckCircle2}
            accent="bg-green-500"
          />
          <StatCard
            label="Completed"
            value={stats.completed}
            icon={ArrowUpRight}
            accent="bg-purple-500"
          />
        </div>

        {/* ══════════ TOOLBAR ══════════ */}
        <div className="bg-white rounded-2xl border border-[#007BFF]/15 p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center shadow-sm">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, customer…"
              className="w-full pl-10 pr-4 py-2.5 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#007BFF]/40 hover:text-[#007BFF]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/40 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl text-[#333333] text-sm focus:outline-none focus:border-[#007BFF] transition-all appearance-none"
            >
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All Statuses" : STATUS_CONFIG[s]?.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#007BFF]/40 pointer-events-none" />
          </div>

          {/* Type Filter */}
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/40 pointer-events-none" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl text-[#333333] text-sm focus:outline-none focus:border-[#007BFF] transition-all appearance-none"
            >
              {designTypes.map((t) => (
                <option key={t} value={t}>
                  {t === "all" ? "All Types" : t}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#007BFF]/40 pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/40 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-9 pr-8 py-2.5 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-xl text-[#333333] text-sm focus:outline-none focus:border-[#007BFF] transition-all appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A–Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#007BFF]/40 pointer-events-none" />
          </div>
        </div>

        {/* ══════════ STATUS FILTER PILLS ══════════ */}
        <div className="flex flex-wrap gap-2">
          {ALL_STATUSES.map((s) => {
            const cfg = STATUS_CONFIG[s];
            const count =
              s === "all"
                ? submissions.length
                : submissions.filter((x) => x.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  statusFilter === s
                    ? "bg-[#007BFF] text-white border-[#007BFF] shadow-md shadow-[#007BFF]/20"
                    : "bg-white text-[#333333]/60 border-[#007BFF]/15 hover:border-[#007BFF]/40 hover:text-[#007BFF]"
                }`}
              >
                {cfg && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${statusFilter === s ? "bg-white" : cfg.dot}`}
                  />
                )}
                {s === "all" ? "All" : cfg?.label}
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs ${statusFilter === s ? "bg-white/20 text-white" : "bg-[#007BFF]/10 text-[#007BFF]"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ══════════ SUBMISSIONS LIST ══════════ */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#007BFF]/10 p-16 text-center">
            <div className="w-16 h-16 bg-[#007BFF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-[#007BFF]/30" />
            </div>
            <h3 className="text-lg font-bold text-[#222222] mb-1">
              No submissions found
            </h3>
            <p className="text-[#333333]/40 text-sm">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setTypeFilter("all");
              }}
              className="mt-4 px-5 py-2 bg-[#007BFF] text-white rounded-lg text-sm font-semibold hover:bg-[#0066CC] transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((sub) => {
              const firstImg = sub.files.find((f) =>
                f.type.startsWith("image/"),
              );
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelected(sub)}
                  className="bg-white rounded-2xl border border-[#007BFF]/10 hover:border-[#007BFF]/40 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5F7FA] border border-[#007BFF]/10 flex items-center justify-center shrink-0">
                      {firstImg?.url ? (
                        <img
                          src={firstImg.url}
                          alt={sub.designName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <FileImage className="w-7 h-7 text-[#007BFF]/20" />
                      )}
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-[#007BFF]/40">
                              {sub.id}
                            </span>
                            <StatusBadge status={sub.status} />
                            {sub.quote && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold rounded-full">
                                ${sub.quote}
                              </span>
                            )}
                          </div>
                          <h3 className="text-[#222222] font-bold text-base mt-0.5 group-hover:text-[#007BFF] transition-colors">
                            {sub.designName}
                          </h3>
                          <p className="text-[#333333]/50 text-xs mt-0.5">
                            {sub.contact.name}
                            {sub.contact.company && ` · ${sub.contact.company}`}
                          </p>
                        </div>

                        <div className="text-right shrink-0 hidden sm:block">
                          <p className="text-[#333333]/40 text-xs">
                            {new Date(sub.submittedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <p className="text-[#007BFF]/50 text-xs mt-0.5">
                            {sub.files.length} file
                            {sub.files.length > 1 ? "s" : ""} ·{" "}
                            {sub.details.designType}
                          </p>
                          {sub.details.width && (
                            <p className="text-[#333333]/30 text-xs">
                              {sub.details.width}" × {sub.details.height}"
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div
                      className="flex items-center gap-2 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {sub.status === "pending" && (
                        <>
                          <button
                            onClick={(e) => quickStatus(e, sub.id, "approved")}
                            title="Approve"
                            className="w-8 h-8 rounded-lg bg-green-50 border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => quickStatus(e, sub.id, "rejected")}
                            title="Reject"
                            className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(sub);
                        }}
                        title="View details"
                        className="w-8 h-8 rounded-lg bg-[#F5F7FA] border border-[#007BFF]/20 text-[#007BFF] flex items-center justify-center hover:bg-[#007BFF] hover:text-white transition-all"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(sub.id);
                        }}
                        title="Delete"
                        className="w-8 h-8 rounded-lg bg-[#F5F7FA] border border-red-100 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Admin note preview */}
                  {sub.adminNote && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="flex items-start gap-2 bg-[#F5F7FA] rounded-lg px-3 py-2 border border-[#007BFF]/10">
                        <MessageSquare className="w-3.5 h-3.5 text-[#007BFF]/40 mt-0.5 shrink-0" />
                        <p className="text-[#333333]/50 text-xs line-clamp-1">
                          {sub.adminNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminArtwork;
