import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Upload,
  ShoppingCart,
  X,
  Check,
  FileText,
  Image,
  DollarSign,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Package,
  Palette,
  Zap,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { useCreateQuote } from "../../hooks/useQuote";

const Quotes = () => {
  const { mutate: createQuote, isPending } = useCreateQuote();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    quantity: "",
    size: "",
    colors: "",
    timeline: "",
    customerName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    budget: "",
  });
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const projectTypes = [
    {
      value: "Custom Patch",
      label: "Custom Patches",
      icon: Package,
      desc: "Iron-on or sew-on patches",
    },
    {
      value: "Embroidery",
      label: "Apparel Embroidery",
      icon: Palette,
      desc: "Shirts, hats, jackets, etc.",
    },
    {
      value: "Digitizing",
      label: "Logo Digitizing",
      icon: Image,
      desc: "Convert logo to embroidery format",
    },
    {
      value: "Chenille Patch",
      label: "Chenille Patch",
      icon: Package,
      desc: "Premium fuzzy patches",
    },
    {
      value: "PVC Patch",
      label: "PVC Patch",
      icon: Package,
      desc: "Durable PVC patches",
    },
    {
      value: "Woven Patch",
      label: "Woven Patch",
      icon: Package,
      desc: "High-quality woven patches",
    },
    {
      value: "Other",
      label: "Bulk / Other Orders",
      icon: Package,
      desc: "Large quantity or custom projects",
    },
  ];

  const quantities = [
    { value: 10, label: "1-10 pieces" }, // backend receives 10
    { value: 50, label: "11-50 pieces" }, // backend receives 50
    { value: 100, label: "51-100 pieces" }, // backend receives 100
    { value: 150, label: "100+ pieces" }, // backend receives 150 (arbitrary large number)
  ];

  const sizes = [
    { value: "small", label: 'Small (2"-3")' },
    { value: "medium", label: 'Medium (3"-4")' },
    { value: "large", label: 'Large (4"-6")' },
    { value: "xlarge", label: 'Extra Large (6"+)' },
  ];

  const timelines = [
    { value: "standard", label: "Standard (7-14 days)", icon: Clock },
    { value: "rush", label: "Rush (3-5 days)", icon: Zap, extra: "+50%" },
    {
      value: "express",
      label: "Express (1-2 days)",
      icon: Zap,
      extra: "+100%",
    },
  ];

  const MAX_FILES = 5;
  const MAX_SIZE_MB = 5;

  const handleFileUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles((prev) => {
      const combined = [...prev, ...selectedFiles];

      if (combined.length > MAX_FILES) {
        toast.error(`You can upload maximum ${MAX_FILES} files`);
        return prev;
      }

      const validFiles = [];

      for (let file of selectedFiles) {
        const isValidType =
          file.type.startsWith("image/") || file.type === "application/pdf";

        const isValidSize = file.size <= MAX_SIZE_MB * 1024 * 1024;

        if (!isValidType) {
          toast.error(`${file.name} is not a valid file type`);
          continue;
        }

        if (!isValidSize) {
          toast.error(`${file.name} exceeds ${MAX_SIZE_MB}MB`);
          continue;
        }

        validFiles.push(file);
      }

      return [...prev, ...validFiles];
    });
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    calculateEstimate({ ...formData, [field]: value });
  };

  const calculateEstimate = (data) => {
    if (!data.projectType || !data.quantity) return;

    let basePrice = 0;
    switch (data.projectType) {
      case "patches":
        basePrice = 15;
        break;
      case "apparel":
        basePrice = 25;
        break;
      case "logo":
        basePrice = 50;
        break;
      case "bulk":
        basePrice = 12;
        break;
      default:
        basePrice = 15;
    }

    let qtyMultiplier = 1;
    switch (data.quantity) {
      case "1-10":
        qtyMultiplier = 10;
        break;
      case "11-50":
        qtyMultiplier = 30;
        break;
      case "51-100":
        qtyMultiplier = 75;
        break;
      case "100+":
        qtyMultiplier = 150;
        break;
      default:
        qtyMultiplier = 1;
    }

    let sizeMultiplier = 1;
    switch (data.size) {
      case "small":
        sizeMultiplier = 1;
        break;
      case "medium":
        sizeMultiplier = 1.3;
        break;
      case "large":
        sizeMultiplier = 1.6;
        break;
      case "xlarge":
        sizeMultiplier = 2;
        break;
      default:
        sizeMultiplier = 1;
    }

    let rushMultiplier = 1;
    switch (data.timeline) {
      case "rush":
        rushMultiplier = 1.5;
        break;
      case "express":
        rushMultiplier = 2;
        break;
      default:
        rushMultiplier = 1;
    }

    const estimate =
      basePrice * qtyMultiplier * sizeMultiplier * rushMultiplier;
    setEstimatedPrice(estimate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();

    // map frontend → backend fields
    data.append("projectType", formData.projectType);
    data.append("quantity", formData.quantity);
    data.append("size", formData.size);
    data.append("colors", formData.colors);
    data.append("budget", formData.budget);
    data.append("description", formData.message);
    data.append("customerName", formData.customerName);
    data.append("email", formData.email);

    const cleanPhone = formData.phone.replace(/\s+/g, "");
    data.append("phone", cleanPhone);

    // timeline conversion
    if (formData.timeline) {
      const timelineDate = new Date();

      if (formData.timeline === "standard")
        timelineDate.setDate(timelineDate.getDate() + 10);

      if (formData.timeline === "rush")
        timelineDate.setDate(timelineDate.getDate() + 5);

      if (formData.timeline === "express")
        timelineDate.setDate(timelineDate.getDate() + 2);

      data.append("timeline", timelineDate.toISOString());
    }

    // attachments
    files.forEach((file) => {
      data.append("attachments", file);
    });

    // 🚀 React Query mutation
    createQuote(data, {
      onSuccess: () => {
        toast.success("Quote submitted successfully 🎉");
        setSubmitted(true);
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to submit quote");
      },

      onSettled: () => {
        setLoading(false);
      },
    });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#101010] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto animate-scale-in">
            <CheckCircle2
              className="w-12 h-12 text-[#101010]"
              strokeWidth={3}
            />
          </div>
          <h2 className="text-4xl font-bold text-[#E8D7B5]">
            Quote Request Received!
          </h2>
          <p className="text-[#D4AF37]/80 text-lg leading-relaxed">
            Thank you for your interest! We've received your quote request and
            our team will review it carefully. You'll receive a detailed quote
            within 24 hours at{" "}
            <span className="text-[#D4AF37] font-semibold">
              {formData.email}
            </span>
            .
          </p>
          {estimatedPrice && (
            <div className="bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-6">
              <p className="text-[#E8D7B5] mb-2">Estimated Price Range:</p>
              <p className="text-4xl font-bold text-[#D4AF37]">
                ${(estimatedPrice * 0.9).toFixed(0)} - $
                {(estimatedPrice * 1.1).toFixed(0)}
              </p>
              <p className="text-[#D4AF37]/60 text-sm mt-2">
                Final quote may vary based on design complexity
              </p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData({
                  projectType: "",
                  quantity: "",
                  size: "",
                  colors: "",
                  timeline: "",
                  customerName: "",
                  email: "",
                  phone: "",
                  company: "",
                  message: "",
                  budget: "",
                });
                setFiles([]);
                setEstimatedPrice(null);
              }}
              className="px-8 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105"
            >
              Submit Another Quote
            </button>
            <Link
              to="/store"
              className="px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#101010]">
      <title>Get A Free Quote | Custom Embroidery Services</title>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#101010] to-[#1A1A1A] border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-semibold backdrop-blur-sm">
              <DollarSign className="w-4 h-4" />
              Free Quote
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#E8D7B5] tracking-tight">
              Get Your Free
              <span className="block text-[#D4AF37] mt-2">Custom Quote</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#D4AF37]/80 max-w-2xl mx-auto leading-relaxed">
              Tell us about your project and receive a detailed quote within 24
              hours
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                    step >= s
                      ? "bg-[#D4AF37] text-[#101010] shadow-lg shadow-[#D4AF37]/50 scale-110"
                      : "bg-[#1A1A1A] text-[#D4AF37] border-2 border-[#D4AF37]/30"
                  }`}
                >
                  {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
                <span
                  className={`text-sm mt-2 font-semibold transition-colors ${
                    step >= s ? "text-[#D4AF37]" : "text-[#D4AF37]/50"
                  }`}
                >
                  {s === 1
                    ? "Project Details"
                    : s === 2
                      ? "Specifications"
                      : "Contact Info"}
                </span>
              </div>
              {s < 3 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded transition-all duration-500 ${
                    step > s ? "bg-[#D4AF37]" : "bg-[#D4AF37]/20"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-8 shadow-2xl"
        >
          {/* Step 1: Project Details */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-4 text-lg">
                  What type of project do you need?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() =>
                          updateFormData("projectType", type.value)
                        }
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                          formData.projectType === type.value
                            ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/20"
                            : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50 bg-[#101010]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              formData.projectType === type.value
                                ? "bg-[#D4AF37]"
                                : "bg-[#D4AF37]/20"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 ${
                                formData.projectType === type.value
                                  ? "text-[#101010]"
                                  : "text-[#D4AF37]"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-[#E8D7B5] font-bold mb-1">
                              {type.label}
                            </h3>
                            <p className="text-[#D4AF37]/70 text-sm">
                              {type.desc}
                            </p>
                          </div>
                          {formData.projectType === type.value && (
                            <Check className="w-6 h-6 text-[#D4AF37] flex-shrink-0" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-4 text-lg">
                  How many pieces do you need?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {quantities.map((qty) => (
                    <button
                      key={qty.value}
                      type="button"
                      onClick={() => updateFormData("quantity", qty.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 font-semibold transform hover:scale-105 ${
                        formData.quantity === qty.value
                          ? "border-[#D4AF37] bg-[#D4AF37] text-[#101010] shadow-lg shadow-[#D4AF37]/30"
                          : "border-[#D4AF37]/20 text-[#D4AF37] hover:border-[#D4AF37]/50 bg-[#101010]"
                      }`}
                    >
                      {qty.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-4 text-lg">
                  Upload Your Design (Optional)
                </label>
                <div className="border-2 border-dashed border-[#D4AF37]/30 rounded-xl p-8 text-center hover:border-[#D4AF37] transition-all duration-300 bg-[#101010]">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.ai,.eps"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                    <p className="text-[#E8D7B5] font-semibold mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-[#D4AF37]/60 text-sm">
                      PNG, JPG, PDF, AI, EPS (Max 10MB)
                    </p>
                  </label>
                </div>
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-[#101010] rounded-lg border border-[#D4AF37]/20"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#D4AF37]" />
                          <span className="text-[#E8D7B5] text-sm">
                            {file.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-[#D4AF37] hover:text-[#E8D7B5] transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Specifications */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-4 text-lg">
                  What size do you need?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      onClick={() => updateFormData("size", size.value)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 font-semibold transform hover:scale-105 ${
                        formData.size === size.value
                          ? "border-[#D4AF37] bg-[#D4AF37] text-[#101010] shadow-lg shadow-[#D4AF37]/30"
                          : "border-[#D4AF37]/20 text-[#D4AF37] hover:border-[#D4AF37]/50 bg-[#101010]"
                      }`}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-4 text-lg">
                  When do you need it?
                </label>
                <div className="space-y-3">
                  {timelines.map((time) => {
                    const Icon = time.icon;
                    return (
                      <button
                        key={time.value}
                        type="button"
                        onClick={() => updateFormData("timeline", time.value)}
                        className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left transform hover:scale-105 ${
                          formData.timeline === time.value
                            ? "border-[#D4AF37] bg-[#D4AF37]/10 shadow-lg shadow-[#D4AF37]/20"
                            : "border-[#D4AF37]/20 hover:border-[#D4AF37]/50 bg-[#101010]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="w-6 h-6 text-[#D4AF37]" />
                            <span className="text-[#E8D7B5] font-semibold">
                              {time.label}
                            </span>
                          </div>
                          {time.extra && (
                            <span className="text-[#D4AF37] text-sm font-bold">
                              {time.extra}
                            </span>
                          )}
                          {formData.timeline === time.value && (
                            <Check className="w-6 h-6 text-[#D4AF37]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-3">
                    Number of Colors
                  </label>
                  <input
                    type="number"
                    value={formData.colors}
                    onChange={(e) => updateFormData("colors", e.target.value)}
                    placeholder="e.g., 3"
                    className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-3">
                    Budget Range (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => updateFormData("budget", e.target.value)}
                    placeholder="e.g., $500-$1000"
                    className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              {estimatedPrice && (
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-6 animate-scale-in">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-[#E8D7B5] font-bold text-lg">
                      Estimated Price Range
                    </h3>
                  </div>
                  <p className="text-3xl font-bold text-[#D4AF37] mb-2">
                    ${(estimatedPrice * 0.9).toFixed(0)} - $
                    {(estimatedPrice * 1.1).toFixed(0)}
                  </p>
                  <p className="text-[#D4AF37]/70 text-sm">
                    This is a rough estimate. Final quote may vary based on
                    design complexity and specifications.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Contact Info */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-3">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) =>
                        updateFormData("customerName", e.target.value)
                      }
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-3">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-3">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-3">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateFormData("company", e.target.value)}
                    placeholder="Optional"
                    className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-3">
                  Additional Message
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-[#D4AF37]/60" />
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateFormData("message", e.target.value)}
                    minLength={10}
                    maxLength={100}
                    placeholder="Tell us more about your project..."
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  />
                </div>
              </div>

              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl p-6">
                <h3 className="text-[#E8D7B5] font-bold mb-4">Quote Summary</h3>
                <div className="space-y-2 text-sm">
                  {formData.projectType && (
                    <div className="flex justify-between">
                      <span className="text-[#D4AF37]/70">Project Type:</span>
                      <span className="text-[#E8D7B5] font-semibold capitalize">
                        {formData.projectType}
                      </span>
                    </div>
                  )}
                  {formData.quantity && (
                    <div className="flex justify-between">
                      <span className="text-[#D4AF37]/70">Quantity:</span>
                      <span className="text-[#E8D7B5] font-semibold">
                        {formData.quantity} pieces
                      </span>
                    </div>
                  )}
                  {formData.size && (
                    <div className="flex justify-between">
                      <span className="text-[#D4AF37]/70">Size:</span>
                      <span className="text-[#E8D7B5] font-semibold capitalize">
                        {formData.size}
                      </span>
                    </div>
                  )}
                  {formData.timeline && (
                    <div className="flex justify-between">
                      <span className="text-[#D4AF37]/70">Timeline:</span>
                      <span className="text-[#E8D7B5] font-semibold capitalize">
                        {formData.timeline}
                      </span>
                    </div>
                  )}
                  {files.length > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#D4AF37]/70">Uploaded Files:</span>
                      <span className="text-[#E8D7B5] font-semibold">
                        {files.length} file(s)
                      </span>
                    </div>
                  )}
                  {formData.colors && (
                    <div className="flex justify-between">
                      <span className="text-[#D4AF37]/70">Colors:</span>
                      <span className="text-[#E8D7B5] font-semibold">
                        {formData.colors}
                      </span>
                    </div>
                  )}
                  {formData.budget && (
                    <div className="flex justify-between">
                      <span className="text-[#D4AF37]/70">Budget:</span>
                      <span className="text-[#E8D7B5] font-semibold">
                        {formData.budget}
                      </span>
                    </div>
                  )}
                  {estimatedPrice && (
                    <div className="flex justify-between mt-2">
                      <span className="text-[#D4AF37]/70">
                        Estimated Price:
                      </span>
                      <span className="text-[#D4AF37] font-bold text-lg">
                        ${(estimatedPrice * 0.9).toFixed(0)} - $
                        {(estimatedPrice * 1.1).toFixed(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all duration-300"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 flex items-center justify-center gap-2"
                disabled={loading} // optional: disable while loading
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-[#101010]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Quote"
                )}
              </button>
            )}
          </div>
        </form>
      </div>

      <section className="relative bg-gradient-to-r from-[#101010] via-[#1A1A1A] to-[#101010] py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-72 h-72 bg-[#D4AF37]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#E8D7B5]">
            Bring Your Custom Embroidery Ideas to Life
          </h2>
          <p className="text-[#D4AF37]/80 text-lg sm:text-xl max-w-2xl mx-auto">
            Get a free quote today and let our expert team turn your vision into
            a beautifully embroidered reality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#101010] font-bold rounded-lg shadow-lg hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Request a Free Quote
            </Link>
            <Link
              to="/store"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quotes;
