import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {

    try {
      // Send form data to backend
      const response = await axios.post(`${API}/api/send-email`, data);

      if (response.data.success) {
        
      
        
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }

    // Reset form after submit
    reset();
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      link: "tel:+15551234567",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@patchshop.com", "orders@patchshop.com"],
      link: "mailto:info@patchshop.com",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Embroidery Lane", "Craft City, ST 12345"],
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9AM - 6PM", "Sat: 10AM - 4PM"],
      link: null,
    },
  ];

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
    <div className="min-h-screen bg-[#101010]">
      <title>Contact Us | Custom Embroidery Services</title>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#101010] to-[#1A1A1A] border-b border-[#D4AF37]/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm font-semibold backdrop-blur-sm">
              <MessageCircle className="w-4 h-4" />
              Get In Touch
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#E8D7B5] tracking-tight">
              Contact Us
              <span className="block text-[#D4AF37] mt-2">
                We're Here to Help
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[#D4AF37]/80 max-w-3xl mx-auto leading-relaxed">
              Have questions about our embroidery services? We'd love to hear
              from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div
                key={idx}
                className="bg-[#1A1A1A] rounded-xl border border-[#D4AF37]/20 p-6 hover:border-[#D4AF37] transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/10 transform hover:-translate-y-2 group"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`,
                }}
              >
                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <Icon
                    className="w-7 h-7 text-[#D4AF37] group-hover:text-[#101010] transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-lg font-bold text-[#E8D7B5] mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-[#D4AF37]/70 text-sm">
                      {info.link ? (
                        <Link
                          to={info.link}
                          className="hover:text-[#D4AF37] transition-colors"
                        >
                          {detail}
                        </Link>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5] mb-4">
                Send Us a Message
              </h2>
              <p className="text-[#D4AF37]/80 text-lg">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-8"
            >
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      {...register("name", { required: true })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      Name is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      {...register("email", { required: true })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      Email is required
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      {...register("phone")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#E8D7B5] font-semibold mb-2">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/60" />
                    <input
                      type="text"
                      placeholder="Optional"
                      className="w-full pl-10 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                      {...register("company")}
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  {...register("subject", { required: true })}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    Subject is required
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[#E8D7B5] font-semibold mb-2">
                  Your Message *
                </label>
                <textarea
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    Message is required
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-[#D4AF37] text-[#101010] rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D4AF37]/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>

              {/* Success Message */}
              {isSubmitSuccessful && (
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-4 animate-fade-in">
                  <p className="text-[#D4AF37] text-center font-semibold">
                    Thank you! We'll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Content */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 overflow-hidden h-64 sm:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459395!3d40.748817379327965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>

            {/* Social Media */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-[#E8D7B5] mb-4">
                Follow Us
              </h3>
              <p className="text-[#D4AF37]/80 mb-6">
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
                      className="flex items-center gap-3 p-4 bg-[#101010] border border-[#D4AF37]/20 rounded-lg hover:border-[#D4AF37] transition-all duration-300 transform hover:scale-105 group"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#D4AF37]/10 group-hover:bg-[#D4AF37] transition-all duration-300">
                        <Icon className="w-5 h-5 text-[#D4AF37] group-hover:text-[#101010] transition-colors duration-300" />
                      </div>
                      <span className="text-[#E8D7B5] font-semibold group-hover:text-[#D4AF37] transition-colors">
                        {social.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-[#D4AF37]/20 p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-[#E8D7B5] mb-4">
                Quick Answers
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border-b border-[#D4AF37]/10 last:border-0 pb-4 last:pb-0"
                  >
                    <h4 className="text-[#E8D7B5] font-semibold mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-[#D4AF37]/70 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1A1A1A] to-[#101010] border border-[#D4AF37]/30 p-12 sm:p-16 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl"></div>
          </div>

          <div className="relative space-y-6">
            <Phone className="w-12 h-12 text-[#D4AF37] mx-auto animate-pulse" />
            <h2 className="text-3xl sm:text-4xl font-bold text-[#E8D7B5]">
              Prefer to Talk?
            </h2>
            <p className="text-[#D4AF37]/80 text-lg max-w-2xl mx-auto">
              Give us a call and speak directly with our embroidery experts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="tel:+15551234567"
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#101010] px-8 py-4 rounded-lg font-bold hover:bg-[#E8D7B5] transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-[#D4AF37]/30"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </Link>
              <Link
                to="mailto:embrodivine@gmail.com"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg font-bold hover:bg-[#D4AF37]/10 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
