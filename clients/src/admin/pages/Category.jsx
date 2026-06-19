import React, { useState } from "react";
import {
  FolderPlus,
  Search,
  Edit,
  Trash2,
  Plus,
  X,
  Image,
  Package,
  AlertCircle,
  Eye,
  EyeOff,
  Grid,
  List,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../hooks/useCategory";

const AdminCategory = () => {
  const { data, isLoading, error } = useCategories();
  const { mutate, isPending } = useCreateCategory();
  const { mutate: deleteCategoryMutate, isPending: isDeletePending } =
    useDeleteCategory();
  const { mutate: updateCategoryMutate, isPending: isUpdatePending } =
    useUpdateCategory();

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    featured: "",
    status: "active",
    seoTitle: "",
    seoDescription: "",
  });

  // const [categories, setCategories] = useState([
  //   {
  //     id: 1,
  //     name: "Cartoon & Kids",
  //     slug: "cartoon-kids",
  //     description: "Fun and colorful designs for children",
  //     image:
  //       "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=300&h=300&fit=crop",
  //     icon: "baby",
  //     status: "active",
  //     productCount: 45,
  //     seoTitle: "Cartoon & Kids Embroidery Patches",
  //     seoDescription:
  //       "Browse our collection of cartoon and kids embroidery designs",
  //     createdDate: "2024-01-15",
  //   },
  //   {
  //     id: 2,
  //     name: "Animals & Pets",
  //     slug: "animals-pets",
  //     description: "Adorable animal and pet designs",
  //     image:
  //       "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=300&h=300&fit=crop",
  //     icon: "heart",
  //     status: "active",
  //     productCount: 38,
  //     seoTitle: "Animal & Pet Embroidery Patches",
  //     seoDescription: "Cute animal and pet embroidery designs for all ages",
  //     createdDate: "2024-01-10",
  //   },
  //   {
  //     id: 3,
  //     name: "Floral & Nature",
  //     slug: "floral-nature",
  //     description: "Beautiful flowers and nature themes",
  //     image:
  //       "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop",
  //     icon: "flower",
  //     status: "active",
  //     productCount: 52,
  //     seoTitle: "Floral & Nature Embroidery Designs",
  //     seoDescription: "Elegant floral and nature-inspired embroidery patches",
  //     createdDate: "2024-01-05",
  //   },
  //   {
  //     id: 4,
  //     name: "Vehicles",
  //     slug: "vehicles",
  //     description: "Cars, bikes and transportation designs",
  //     image:
  //       "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
  //     icon: "car",
  //     status: "active",
  //     productCount: 28,
  //     seoTitle: "Vehicle Embroidery Patches",
  //     seoDescription: "Car, bike and transportation embroidery designs",
  //     createdDate: "2024-01-20",
  //   },
  //   {
  //     id: 5,
  //     name: "Sports & Games",
  //     slug: "sports-games",
  //     description: "Sports and gaming themed designs",
  //     image:
  //       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=300&fit=crop",
  //     icon: "trophy",
  //     status: "active",
  //     productCount: 35,
  //     seoTitle: "Sports & Gaming Embroidery Patches",
  //     seoDescription: "Sports and gaming themed embroidery designs",
  //     createdDate: "2024-01-12",
  //   },
  //   {
  //     id: 6,
  //     name: "Logos & Badges",
  //     slug: "logos-badges",
  //     description: "Professional logos and badges",
  //     image:
  //       "https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=300&h=300&fit=crop",
  //     icon: "badge",
  //     status: "inactive",
  //     productCount: 42,
  //     seoTitle: "Logo & Badge Embroidery Designs",
  //     seoDescription: "Professional logo and badge embroidery patches",
  //     createdDate: "2024-01-08",
  //   },
  // ]);

  const categories = data?.categories || data || [];

  const stats = [
    {
      label: "Total Categories",
      value: categories.length,
      icon: FolderPlus,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Active",
      value: categories.filter((c) => c.status === "active").length,
      icon: Eye,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Inactive",
      value: categories.filter((c) => c.status === "inactive").length,
      icon: EyeOff,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    // {
    //   label: "Total Products",
    //   value: categories.reduce((sum, c) => sum + c.productCount, 0),
    //   icon: Package,
    //   color: "text-[#D4AF37]",
    //   bgColor: "bg-[#D4AF37]/10",
    // },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleInputChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : files ? files[0] : value,
      };

      if (name === "name" && !selectedCategory) {
        updated.slug = value.toLowerCase().replace(/\s+/g, "-");
      }

      return updated;
    });

    if (files?.length) {
      setSelectedFileName(files[0].name);
    }
  };

  const handleCreateCategory = async () => {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("featured", formData.featured ? "true" : "false");
    data.append("seoTitle", formData.seoTitle);
    data.append("seoDescription", formData.seoDescription);

    if (formData.image instanceof File) {
      data.append("thumbnail", formData.image);
    }

    mutate(data, {
      onSuccess: () => {
        setShowCreateModal(false);
        resetForm();
      },
    });
  };

  const handleUpdateCategory = (id) => {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("status", formData.status);
    data.append("featured", formData.featured ? "true" : "false");
    data.append("seoTitle", formData.seoTitle);
    data.append("seoDescription", formData.seoDescription);

    if (formData.image instanceof File) {
      data.append("thumbnail", formData.image);
    }

    updateCategoryMutate(
      { id, data },
      {
        onSuccess: () => {
          setShowEditModal(false);
          setSelectedCategory(null);
          resetForm();
          toast.success("Category updated successfully");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Update failed");
        },
      },
    );
  };

  const handleDeleteCategory = (id) => {
    deleteCategoryMutate(id, {
      onSuccess: () => {
        setShowDeleteModal(false);
        setSelectedCategory(null);
      },
      onError: (error) => {
        console.error("Error deleting category:", error);
        toast.error(error.response?.data?.message || "Failed to delete category. Please try again.");
      },
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      image: "",
      featured: false,
      status: "active",
      seoTitle: "",
      seoDescription: "",
    });

    setSelectedFileName("");
    setSelectedCategory(null);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      featured: category.featured,
      status: category.status,
      seoTitle: category.seoTitle,
      seoDescription: category.seoDescription,
    });
    setSelectedFileName(category.image?.split("/").pop() || "");
    setShowEditModal(true);
  };

  const CategoryForm = ({ isEdit = false }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Cartoon & Kids"
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">Slug *</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            placeholder="e.g., cartoon-kids"
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-[#D4AF37]/70 text-sm mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description of the category"
          rows={3}
          className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Featured
          </label>
          <select
            name="featured"
            value={formData.featured}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[#D4AF37]/70 text-sm mb-2">Image</label>

        <label
          htmlFor="image-upload"
          className="flex items-center justify-between w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg cursor-pointer hover:border-[#D4AF37] transition-colors"
        >
          <span
            className={`truncate ${
              selectedFileName ? "text-[#E8D7B5]" : "text-[#D4AF37]/50"
            }`}
          >
            {selectedFileName || "Choose an image..."}
          </span>

          <span className="px-3 py-1 text-sm bg-[#D4AF37] text-black rounded-md font-medium">
            Browse
          </span>
        </label>

        <input
          id="image-upload"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />

        {selectedFileName && (
          <p className="mt-2 text-xs text-green-400">
            ✓ File selected: {selectedFileName}
          </p>
        )}
      </div>

      <div className="border-t border-[#D4AF37]/20 pt-4">
        <h4 className="text-[#E8D7B5] font-semibold mb-4">SEO Settings</h4>
        <div>
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Meta Title
          </label>
          <input
            type="text"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleInputChange}
            placeholder="Meta title for SEO"
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
        <div className="mt-4">
          <label className="block text-[#D4AF37]/70 text-sm mb-2">
            Meta Description
          </label>
          <textarea
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleInputChange}
            placeholder="Meta description for SEO"
            rows={2}
            className="w-full px-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37] resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => {
            if (isEdit) {
              setShowEditModal(false);
            } else {
              setShowCreateModal(false);
            }
            setSelectedCategory(null);
            resetForm();
          }}
          className="flex-1 px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            isEdit
              ? handleUpdateCategory(selectedCategory._id)
              : handleCreateCategory();
          }}
          className="flex-1 px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5]"
        >
          {isEdit
            ? isUpdatePending
              ? "Updating..."
              : "Update Category"
            : isPending
              ? "Creating..."
              : "Create Category"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#101010] p-4 sm:p-6 lg:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#E8D7B5] mb-2">
              Category Management
            </h1>
            <p className="text-[#D4AF37]/70">
              Create and manage product categories
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-[#D4AF37] text-[#101010] rounded-lg font-semibold hover:bg-[#E8D7B5] flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Category
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
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
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#101010] border border-[#D4AF37]/30 rounded-lg text-[#E8D7B5] placeholder-[#D4AF37]/50 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg border transition-all ${
                  viewMode === "grid"
                    ? "bg-[#D4AF37] border-[#D4AF37] text-[#101010]"
                    : "bg-[#101010] border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg border transition-all ${
                  viewMode === "list"
                    ? "bg-[#D4AF37] border-[#D4AF37] text-[#101010]"
                    : "bg-[#101010] border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category._id}
                className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37]/50"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden bg-[#101010]">
                  <img
                    src={category.thumbnail.url}
                    alt={category.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        category.status === "active"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-orange-500/20 text-orange-500"
                      }`}
                    >
                      {category.status}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[#E8D7B5] font-bold text-lg mb-2">
                    {category.name}
                  </h3>
                  <p className="text-[#D4AF37]/70 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="space-y-2 mb-4 pb-4 border-b border-[#D4AF37]/20">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#D4AF37]/60">Products:</span>
                      <span className="text-[#E8D7B5] font-semibold">
                        {category.productCount}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#D4AF37]/60">Slug:</span>
                      <span className="text-[#D4AF37]">{category.slug}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(category)}
                      className="flex-1 px-3 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/20 flex items-center justify-center gap-2 font-semibold"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowDeleteModal(true);
                      }}
                      className="flex-1 px-3 py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 flex items-center justify-center gap-2 font-semibold"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-[#1A1A1A] border border-[#D4AF37]/20 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#101010]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#D4AF37]/70 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {filteredCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-[#D4AF37]/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={category.thumbnail.url}
                          alt={category.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="text-[#E8D7B5] font-semibold">
                            {category.name}
                          </p>
                          <p className="text-[#D4AF37]/60 text-sm">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#D4AF37]">{category.slug}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#E8D7B5] font-semibold">
                        {category.productCount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          category.status === "active"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-orange-500/20 text-orange-500"
                        }`}
                      >
                        {category.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37]/20"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20"
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
        )}

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderPlus className="w-10 h-10 text-[#D4AF37]/50" />
            </div>
            <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
              No categories found
            </h3>
            <p className="text-[#D4AF37]/70">
              Create a new category to get started
            </p>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/20">
                <h3 className="text-2xl font-bold text-[#E8D7B5]">
                  Create New Category
                </h3>

                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <CategoryForm />
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#1A1A1A] border-2 border-[#D4AF37]/30 rounded-2xl max-w-2xl w-full p-6 my-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#E8D7B5]">
                  Edit Category
                </h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    resetForm();
                  }}
                  className="w-10 h-10 rounded-full bg-[#101010] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <CategoryForm isEdit={true} />
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && selectedCategory && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1A1A1A] border-2 border-red-500/30 rounded-2xl max-w-md w-full p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#E8D7B5] mb-2">
                  Delete Category?
                </h3>
                <p className="text-[#D4AF37]/70">
                  Are you sure you want to delete{" "}
                  <span className="text-[#E8D7B5] font-semibold">
                    {selectedCategory.name}
                  </span>
                  ? This has{" "}
                  <span className="font-semibold">
                    {selectedCategory.productCount}
                  </span>{" "}
                  products. This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedCategory(null);
                  }}
                  className="flex-1 px-6 py-3 bg-[#101010] border border-[#D4AF37]/30 text-[#D4AF37] rounded-lg font-semibold hover:bg-[#D4AF37]/10"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteCategory(selectedCategory._id)}
                  disabled={isDeletePending}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                >
                  {isDeletePending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategory;
