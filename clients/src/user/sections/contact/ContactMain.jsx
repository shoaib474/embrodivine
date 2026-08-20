import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  CheckCircle2,
  User,
  Building,
} from "lucide-react";

import { useSubmitContact } from "../../../hooks/useContact";

const ContactMain = () => {
  const { mutate: sendMessage, isPending } = useSubmitContact();

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    sendMessage(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Message sent successfully!");
        setSubmitted(true);
        // Reset form after submit
        reset();
      },
      onError: (error) => {
        toast.error("Failed to send message. Please try again.");
      },
    });
  };

  const socialMedia = [
    { icon: Facebook, name: "Facebook", link: "#", color: "#1877F2" },
    { icon: Instagram, name: "Instagram", link: "#", color: "#E4405F" },
    { icon: Twitter, name: "Twitter", link: "#", color: "#1DA1F2" },
    { icon: Linkedin, name: "LinkedIn", link: "#", color: "#0A66C2" },
  ];

  const faqs = [
    {
      question: "How long does it take to get a response?",
      answer:
        "We typically respond to all inquiries within 24 hours during business days.",
    },
    {
      question: "Can I visit your location?",
      answer:
        "Yes! We welcome visitors by appointment. Please call ahead to schedule a visit.",
    },
    {
      question: "Do you offer phone consultations?",
      answer:
        "Absolutely! Call us during business hours for immediate assistance with your project.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#222222] mb-4">
              Send Us a Message
            </h2>
            <p className="text-[#007BFF]/80 text-lg">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white rounded-2xl border border-[#007BFF]/20 p-6 sm:p-8"
          >
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#222222] font-semibold mb-2">
                  Your Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/30 rounded-lg text-[#333333] placeholder-[#007BFF]/40 focus:outline-none focus:border-[#007BFF] transition-colors"
                    {...register("name", { required: true })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">Name is required</p>
                )}
              </div>

              <div>
                <label className="block text-[#222222] font-semibold mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/30 rounded-lg text-[#333333] placeholder-[#007BFF]/40 focus:outline-none focus:border-[#007BFF] transition-colors"
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
            </div>

            {/* Phone & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#222222] font-semibold mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/30 rounded-lg text-[#333333] placeholder-[#007BFF]/40 focus:outline-none focus:border-[#007BFF] transition-colors"
                    {...register("phone")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#222222] font-semibold mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#007BFF]/60" />
                  <input
                    type="text"
                    placeholder="Optional"
                    className="w-full pl-10 pr-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/30 rounded-lg text-[#333333] placeholder-[#007BFF]/40 focus:outline-none focus:border-[#007BFF] transition-colors"
                    {...register("company")}
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[#222222] font-semibold mb-2">
                Subject *
              </label>
              <input
                type="text"
                placeholder="How can we help you?"
                className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/30 rounded-lg text-[#333333] placeholder-[#007BFF]/40 focus:outline-none focus:border-[#007BFF] transition-colors"
                {...register("subject", { required: true })}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">Subject is required</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-[#222222] font-semibold mb-2">
                Your Message *
              </label>
              <textarea
                placeholder="Tell us more about your inquiry..."
                rows="6"
                className="w-full px-4 py-3 bg-[#F5F7FA] border border-[#007BFF]/30 rounded-lg text-[#333333] placeholder-[#007BFF]/40 focus:outline-none focus:border-[#007BFF] transition-colors resize-none"
                {...register("message", { required: true })}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">Message is required</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full px-8 py-4 bg-[#007BFF] text-white rounded-lg font-bold hover:bg-[#0066CC] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#007BFF]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Message Sent...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>

            {/* Success Message */}
            {submitted && (
              <div className="bg-[#007BFF]/10 border border-[#007BFF]/30 rounded-lg p-4 animate-fade-in">
                <p className="text-[#007BFF] text-center font-semibold">
                  Thank you! We'll get back to you within 24 hours.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Right Side Content */}
        <div className="space-y-8">
          {/* Social Media */}
          <div className="bg-white rounded-2xl border border-[#007BFF]/20 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-[#222222] mb-4">
              Follow Us
            </h3>
            <p className="text-[#007BFF]/80 mb-6">
              Stay connected with us on social media for updates, inspiration,
              and special offers.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {socialMedia.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={idx}
                    to={social.link}
                    className="flex items-center gap-3 p-4 bg-[#F5F7FA] border border-[#007BFF]/20 rounded-lg hover:border-[#007BFF] transition-all duration-300 transform hover:scale-105 group"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#007BFF]/10 group-hover:bg-[#007BFF] transition-all duration-300">
                      <Icon className="w-5 h-5 text-[#007BFF] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[#333333] font-semibold group-hover:text-[#007BFF] transition-colors">
                      {social.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl border border-[#007BFF]/20 p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-[#222222] mb-4">
              Quick Answers
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border-b border-[#007BFF]/10 last:border-0 pb-4 last:pb-0"
                >
                  <h4 className="text-[#222222] font-semibold mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-[#007BFF]/70 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMain;
