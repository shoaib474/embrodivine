import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  FileImage,
  FileText,
  CheckCircle2,
  AlertCircle,
  Cloud,
  Palette,
  Ruler,
  MessageSquare,
  User,
  Mail,
  Phone,
  ArrowRight,
  Eye,
  Trash2,
  ImageIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

import PreviewModal from "../sections/uploadArtwork/PreviewModal";
import FileCard from "../sections/uploadArtwork/FileCard";
import StepBar from "../sections/uploadArtwork/StepBar";
import UploadArtworkHero from "../sections/uploadArtwork/UploadArtworkHero";

// ─── Main Page ───────────────────────────────────────────────────────────────
const UploadArtwork = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const [details, setDetails] = useState({
    designName: "",
    designType: "",
    width: "",
    height: "",
    colors: "",
    fabric: "",
    notes: "",
  });

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [errors, setErrors] = useState({});

  const designTypes = [
    "Logo / Brand",
    "Text / Lettering",
    "Floral / Nature",
    "Animal / Wildlife",
    "Abstract / Pattern",
    "Sports / Team",
    "Custom Illustration",
    "Other",
  ];

  const fabricTypes = [
    "Cotton",
    "Polyester",
    "Denim",
    "Canvas",
    "Fleece",
    "Silk",
    "Not Sure",
  ];

  // ── File Handling ──
  const ACCEPTED = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "application/pdf",
    "image/svg+xml",
  ];
  const MAX_SIZE_MB = 10;

  const addFiles = (incoming) => {
    const valid = [];
    const rejected = [];

    Array.from(incoming).forEach((f) => {
      if (!ACCEPTED.includes(f.type)) {
        rejected.push(`${f.name} — unsupported format`);
      } else if (f.size / 1024 / 1024 > MAX_SIZE_MB) {
        rejected.push(`${f.name} — exceeds 10 MB`);
      } else if (files.some((x) => x.name === f.name)) {
        rejected.push(`${f.name} — already added`);
      } else {
        valid.push(f);
      }
    });

    if (rejected.length) {
      setErrors((e) => ({ ...e, files: rejected.join("; ") }));
    } else {
      setErrors((e) => ({ ...e, files: null }));
    }

    setFiles((prev) => [...prev, ...valid]);
  };

  const removeFile = (name) =>
    setFiles((prev) => prev.filter((f) => f.name !== name));

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  // ── Validation ──
  const validateStep = () => {
    const errs = {};

    if (step === 1 && files.length === 0) {
      errs.files = "Please upload at least one artwork file.";
    }

    if (step === 2) {
      if (!details.designName.trim())
        errs.designName = "Design name is required.";
      if (!details.designType) errs.designType = "Please select a design type.";
      if (!details.width.trim()) errs.width = "Width is required.";
      if (!details.height.trim()) errs.height = "Height is required.";
    }

    if (step === 3) {
      if (!contact.name.trim()) errs.name = "Full name is required.";
      if (!contact.email.trim() || !/\S+@\S+\.\S+/.test(contact.email))
        errs.email = "Valid email is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const prevStep = () => {
    setErrors({});
    setStep((s) => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) setSubmitted(true);
  };

  // ── Success Screen ─────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 pt-24 pb-16">
        <div className="max-w-md w-full text-center space-y-6 bg-white rounded-2xl border border-[#007BFF]/20 p-10 shadow-xl">
          <div className="w-20 h-20 bg-[#007BFF] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold text-[#222222]">
            Artwork Submitted!
          </h2>
          <p className="text-[#333333]/60 leading-relaxed">
            Thank you,{" "}
            <span className="font-semibold text-[#007BFF]">{contact.name}</span>
            ! We've received your artwork and will review it within 24 hours.
            You'll hear from us at{" "}
            <span className="font-semibold text-[#007BFF]">
              {contact.email}
            </span>
            .
          </p>

          <div className="bg-[#F5F7FA] rounded-xl p-4 border border-[#007BFF]/10 text-left space-y-2">
            <p className="text-xs font-bold text-[#007BFF]/60 uppercase tracking-wider mb-3">
              Submission Summary
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-[#333333]/50">Design Name</span>
              <span className="text-[#222222] font-semibold">
                {details.designName}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#333333]/50">Type</span>
              <span className="text-[#222222] font-semibold">
                {details.designType}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#333333]/50">Size</span>
              <span className="text-[#222222] font-semibold">
                {details.width}" × {details.height}"
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#333333]/50">Files</span>
              <span className="text-[#222222] font-semibold">
                {files.length} file(s)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/"
              className="flex-1 px-6 py-3 bg-[#F5F7FA] border border-[#007BFF]/20 text-[#007BFF] rounded-lg font-semibold hover:bg-[#007BFF]/10 transition text-center"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFiles([]);
                setDetails({
                  designName: "",
                  designType: "",
                  width: "",
                  height: "",
                  colors: "",
                  fabric: "",
                  notes: "",
                });
                setContact({ name: "", email: "", phone: "", company: "" });
              }}
              className="flex-1 px-6 py-3 bg-[#007BFF] text-white rounded-lg font-semibold hover:bg-[#0066CC] transition"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />

      <div className="min-h-screen pt-24  bg-[#ffffff]">
        {/* ══════════ HERO HEADER ══════════ */}
        <UploadArtworkHero />
        <div className="bg-[#f5f7fa] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* ── Step Bar ── */}
            <StepBar step={step} />

            {/* ══════════ FORM CARD ══════════ */}
            <div className="bg-white rounded-2xl border border-[#007BFF]/20 shadow-sm p-6 sm:p-8">
              {/* ════ STEP 1 — Upload Artwork ════ */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#222222] mb-1 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#007BFF]" />
                      Upload Your Artwork Files
                    </h2>
                    <p className="text-[#333333]/50 text-sm">
                      PNG, JPG, WEBP, PDF, SVG accepted · Max 10 MB per file
                    </p>
                  </div>

                  {/* Drop Zone */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? "border-[#007BFF] bg-[#007BFF]/5 scale-[1.01]"
                        : "border-[#007BFF]/25 bg-[#F5F7FA] hover:border-[#007BFF]/60 hover:bg-[#007BFF]/5"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".png,.jpg,.jpeg,.webp,.pdf,.svg"
                      className="hidden"
                      onChange={(e) => addFiles(e.target.files)}
                    />
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all ${
                        isDragging
                          ? "bg-[#007BFF] text-white"
                          : "bg-[#007BFF]/10 text-[#007BFF]"
                      }`}
                    >
                      <Upload className="w-8 h-8" />
                    </div>
                    <p className="text-[#222222] font-bold text-lg mb-1">
                      {isDragging
                        ? "Drop files here"
                        : "Drag & drop your files"}
                    </p>
                    <p className="text-[#333333]/40 text-sm mb-4">
                      or click to browse from your device
                    </p>
                    <span className="inline-block px-5 py-2 bg-[#007BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#0066CC] transition">
                      Choose Files
                    </span>
                  </div>

                  {errors.files && (
                    <div className="flex items-start gap-2 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      {errors.files}
                    </div>
                  )}

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[#222222] font-semibold text-sm">
                        {files.length} file{files.length > 1 ? "s" : ""}{" "}
                        selected
                      </p>
                      {files.map((f) => (
                        <FileCard
                          key={f.name}
                          file={f}
                          onRemove={removeFile}
                          onPreview={setPreviewFile}
                        />
                      ))}
                    </div>
                  )}

                  {/* Tips */}
                  <div className="bg-[#007BFF]/5 border border-[#007BFF]/15 rounded-xl p-5">
                    <p className="text-[#007BFF] font-semibold text-sm mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Tips for best results
                    </p>
                    <ul className="text-[#333333]/60 text-sm space-y-1.5">
                      <li>✓ Use high-resolution images (300 DPI or higher)</li>
                      <li>
                        ✓ Vector files (SVG) give the cleanest digitizing
                        results
                      </li>
                      <li>✓ Avoid very fine details smaller than 1mm</li>
                      <li>✓ Use transparent backgrounds when possible</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* ════ STEP 2 — Design Details ════ */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#222222] mb-1 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-[#007BFF]" />
                      Design Details
                    </h2>
                    <p className="text-[#333333]/50 text-sm">
                      Tell us more about your design so we can digitize it
                      perfectly.
                    </p>
                  </div>

                  {/* Design Name */}
                  <div>
                    <label className="block text-[#222222] font-semibold mb-2 text-sm">
                      Design Name *
                    </label>
                    <input
                      type="text"
                      value={details.designName}
                      onChange={(e) =>
                        setDetails({ ...details, designName: e.target.value })
                      }
                      placeholder="e.g. Company Logo, Team Mascot"
                      className={`w-full px-4 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                        errors.designName
                          ? "border-red-400"
                          : "border-[#007BFF]/25"
                      }`}
                    />
                    {errors.designName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.designName}
                      </p>
                    )}
                  </div>

                  {/* Design Type */}
                  <div>
                    <label className="block text-[#222222] font-semibold mb-2 text-sm">
                      Design Type *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {designTypes.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() =>
                            setDetails({ ...details, designType: t })
                          }
                          className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                            details.designType === t
                              ? "bg-[#007BFF] text-white border-[#007BFF] shadow-md shadow-[#007BFF]/20"
                              : "bg-[#F5F7FA] text-[#333333] border-[#007BFF]/20 hover:border-[#007BFF]/50"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.designType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.designType}
                      </p>
                    )}
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label className="block text-[#222222] font-semibold mb-2 text-sm flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-[#007BFF]" />
                      Dimensions (inches) *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="number"
                          value={details.width}
                          onChange={(e) =>
                            setDetails({ ...details, width: e.target.value })
                          }
                          placeholder="Width"
                          min="0"
                          step="0.1"
                          className={`w-full px-4 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                            errors.width
                              ? "border-red-400"
                              : "border-[#007BFF]/25"
                          }`}
                        />
                        {errors.width && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.width}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="number"
                          value={details.height}
                          onChange={(e) =>
                            setDetails({ ...details, height: e.target.value })
                          }
                          placeholder="Height"
                          min="0"
                          step="0.1"
                          className={`w-full px-4 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                            errors.height
                              ? "border-red-400"
                              : "border-[#007BFF]/25"
                          }`}
                        />
                        {errors.height && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors.height}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Colors & Fabric */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#222222] font-semibold mb-2 text-sm">
                        Number of Colors
                      </label>
                      <input
                        type="number"
                        value={details.colors}
                        onChange={(e) =>
                          setDetails({ ...details, colors: e.target.value })
                        }
                        placeholder="e.g. 4"
                        min="1"
                        className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/25 rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[#222222] font-semibold mb-2 text-sm">
                        Fabric / Garment Type
                      </label>
                      <select
                        value={details.fabric}
                        onChange={(e) =>
                          setDetails({ ...details, fabric: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/25 rounded-lg text-[#333333] focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
                      >
                        <option value="">Select fabric…</option>
                        {fabricTypes.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[#222222] font-semibold mb-2 text-sm flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#007BFF]" />
                      Additional Notes
                    </label>
                    <textarea
                      value={details.notes}
                      onChange={(e) =>
                        setDetails({ ...details, notes: e.target.value })
                      }
                      placeholder="Any special instructions, color preferences, or placement details…"
                      rows={4}
                      className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/25 rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all resize-none"
                    />
                  </div>
                </div>
              )}

              {/* ════ STEP 3 — Contact Info ════ */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#222222] mb-1 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#007BFF]" />
                      Your Contact Details
                    </h2>
                    <p className="text-[#333333]/50 text-sm">
                      We'll use these details to send you a quote and updates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[#222222] font-semibold mb-2 text-sm">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/50" />
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) =>
                            setContact({ ...contact, name: e.target.value })
                          }
                          placeholder="John Doe"
                          className={`w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                            errors.name
                              ? "border-red-400"
                              : "border-[#007BFF]/25"
                          }`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[#222222] font-semibold mb-2 text-sm">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/50" />
                        <input
                          type="email"
                          value={contact.email}
                          onChange={(e) =>
                            setContact({ ...contact, email: e.target.value })
                          }
                          placeholder="john@example.com"
                          className={`w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all ${
                            errors.email
                              ? "border-red-400"
                              : "border-[#007BFF]/25"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[#222222] font-semibold mb-2 text-sm">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#007BFF]/50" />
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) =>
                            setContact({ ...contact, phone: e.target.value })
                          }
                          placeholder="+1 (555) 123-4567"
                          className="w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/25 rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-[#222222] font-semibold mb-2 text-sm">
                        Company / Brand
                      </label>
                      <input
                        type="text"
                        value={contact.company}
                        onChange={(e) =>
                          setContact({ ...contact, company: e.target.value })
                        }
                        placeholder="Optional"
                        className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/25 rounded-lg text-[#333333] placeholder-[#007BFF]/30 focus:outline-none focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/10 transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ════ STEP 4 — Review & Submit ════ */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#222222] mb-1 flex items-center gap-2">
                      <Eye className="w-5 h-5 text-[#007BFF]" />
                      Review Your Submission
                    </h2>
                    <p className="text-[#333333]/50 text-sm">
                      Double-check everything before submitting.
                    </p>
                  </div>

                  {/* Files */}
                  <div className="bg-[#F5F7FA] rounded-xl p-5 border border-[#007BFF]/10">
                    <p className="text-xs font-bold text-[#007BFF]/60 uppercase tracking-wider mb-3">
                      Uploaded Files ({files.length})
                    </p>
                    <div className="space-y-2">
                      {files.map((f) => (
                        <div
                          key={f.name}
                          className="flex items-center gap-3 text-sm"
                        >
                          <FileImage className="w-4 h-4 text-[#007BFF]/50 shrink-0" />
                          <span className="text-[#333333] truncate">
                            {f.name}
                          </span>
                          <span className="text-[#333333]/40 shrink-0">
                            {(f.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Design Details */}
                  <div className="bg-[#F5F7FA] rounded-xl p-5 border border-[#007BFF]/10">
                    <p className="text-xs font-bold text-[#007BFF]/60 uppercase tracking-wider mb-3">
                      Design Details
                    </p>
                    <div className="space-y-2 text-sm">
                      {[
                        ["Design Name", details.designName],
                        ["Type", details.designType],
                        [
                          "Dimensions",
                          details.width && details.height
                            ? `${details.width}" × ${details.height}"`
                            : "—",
                        ],
                        ["Colors", details.colors || "—"],
                        ["Fabric", details.fabric || "—"],
                        ["Notes", details.notes || "—"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4">
                          <span className="text-[#333333]/50 shrink-0">
                            {label}
                          </span>
                          <span className="text-[#222222] font-medium text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-[#F5F7FA] rounded-xl p-5 border border-[#007BFF]/10">
                    <p className="text-xs font-bold text-[#007BFF]/60 uppercase tracking-wider mb-3">
                      Contact Info
                    </p>
                    <div className="space-y-2 text-sm">
                      {[
                        ["Name", contact.name],
                        ["Email", contact.email],
                        ["Phone", contact.phone || "—"],
                        ["Company", contact.company || "—"],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between gap-4">
                          <span className="text-[#333333]/50 shrink-0">
                            {label}
                          </span>
                          <span className="text-[#222222] font-medium text-right">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Agreement */}
                  <p className="text-[#333333]/40 text-xs text-center">
                    By submitting you agree to our{" "}
                    <Link
                      to="/term-conditions"
                      className="text-[#007BFF] hover:underline font-semibold"
                    >
                      Terms & Conditions
                    </Link>
                    . We'll respond within 24 business hours.
                  </p>
                </div>
              )}

              {/* ══════════ NAVIGATION BUTTONS ══════════ */}
              <div className="flex justify-between mt-8 pt-6 border-t border-[#007BFF]/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-[#F5F7FA] border border-[#007BFF]/25 text-[#007BFF] rounded-lg font-semibold hover:bg-[#007BFF]/10 transition-all"
                  >
                    ← Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#007BFF] text-white rounded-lg font-semibold hover:bg-[#0066CC] transition-all flex items-center gap-2 shadow-md shadow-[#007BFF]/20 hover:scale-105 active:scale-95"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-[#007BFF] text-white rounded-lg font-semibold hover:bg-[#0066CC] transition-all flex items-center gap-2 shadow-md shadow-[#007BFF]/20 hover:scale-105 active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Submit Artwork
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadArtwork;
