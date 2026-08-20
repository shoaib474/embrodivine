import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit,
  Save,
  X,
  Zap,
  Globe,
  Building,
  Trash2,
} from "lucide-react";

const Profile = ({ userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  // Initialize react-hook-form with userData
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: userData,
  });

  // Watch all fields to reflect changes in UI immediately
  const watchedFields = watch();

  useEffect(() => {
    // Reset form if userData changes
    reset(userData);
  }, [userData, reset]);

  const handleSave = (data) => {
    setIsEditing(false);
    if (onSave) {
      onSave({ ...data, avatar: profileImage });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#222222] mb-2">
            My Profile
          </h1>
          <p className="text-[#4B5563]">
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="lg:col-span-3">
          <motion.form
            onSubmit={handleSubmit(handleSave)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#ffffff] border border-slate-200 rounded-3xl p-6 md:p-8"
          >
            {/* Header with Edit Button */}
            <div className="flex items-center justify-between flex-col md:flex-row gap-5 mb-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-[#222222] mb-1">
                  Personal Information
                </h2>
                <p className="text-[#6B7280] text-sm">
                  Update your personal details
                </p>
              </div>

              {!isEditing ? (
                <button
                  type="submit"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#007BFF] text-white rounded-lg font-semibold hover:bg-[#0066CC] transition-all"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-[#10B981] text-white rounded-lg font-semibold hover:bg-[#059669] transition-all"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      reset(userData); // revert changes
                      setIsEditing(false);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-red-50 border border-red-200 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-all"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Profile Image */}
            <div className="flex flex-col items-center mb-8 pb-8 border-b border-[#D1D5DB]">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-[#007BFF] to-[#3B82F6] rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      loading="lazy"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-4xl font-bold">
                      {watchedFields.name
                        ? watchedFields.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </span>
                  )}
                </div>

                {isEditing && (
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-[#007BFF] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#0066CC] transition-all">
                    <Camera className="w-5 h-5 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <h3 className="text-xl font-bold text-[#222222] mt-4">
                {watchedFields.name || "User Name"}
              </h3>

              <p className="text-[#6B7280] text-sm">
                {watchedFields.email || "user@example.com"}
              </p>

              <div className="flex items-center gap-2 mt-3 px-4 py-2 bg-[#007BFF]/10 border border-[#007BFF]/20 rounded-full">
                <Zap className="w-4 h-4 text-[#007BFF]" />
                <span className="text-[#007BFF] text-sm font-semibold">
                  Premium Member
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              {/* Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true, maxLength: 100 })}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="email"
                      {...register("email")}
                      disabled
                      className="w-full pl-11 pr-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      type="tel"
                      {...register("phone")}
                      disabled={!isEditing}
                      placeholder="+1 (555) 123-4567"
                      className="w-full pl-11 pr-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    Gender
                  </label>
                  <select
                    {...register("gender")}
                    value={watchedFields.gender || ""}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-[#222222] font-semibold mb-2 text-sm">
                  Company (Optional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    {...register("company")}
                    placeholder="e.g., Creative Designs Co."
                    disabled={!isEditing}
                    className="w-full pl-11 pr-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[#222222] font-semibold mb-2 text-sm">
                  Street Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="123 Main St, Apt 4B"
                    disabled={!isEditing}
                    className="w-full pl-11 pr-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              {/* Location Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    City
                  </label>
                  <input
                    type="text"
                    {...register("city")}
                    disabled={!isEditing}
                    placeholder="e.g., New York"
                    className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    State
                  </label>
                  <input
                    type="text"
                    {...register("state")}
                    placeholder="e.g., California"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[#222222] font-semibold mb-2 text-sm">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    {...register("zipCode")}
                    placeholder="12345"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-[#222222] font-semibold mb-2 text-sm">
                  Country
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    type="text"
                    {...register("country")}
                    placeholder="United States"
                    disabled={!isEditing}
                    className="w-full pl-11 pr-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[#222222] font-semibold mb-2 text-sm">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  placeholder="Tell us about yourself..."
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-3 bg-[#f5f7fa] border border-[#D1D5DB] rounded-lg text-[#222222] focus:outline-none focus:border-[#007BFF] disabled:opacity-60 disabled:cursor-not-allowed transition-all resize-none"
                />
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
