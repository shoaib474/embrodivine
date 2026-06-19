import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ======================================
// ➕ CREATE CATEGORY (ADMIN)
// ======================================
export const createCategory = async (data) => {
  const res = await axios.post(`${API}/api/categories`, data, {
    withCredentials: true,
  });

  return res.data;
};

// ======================================
// 📥 GET ALL CATEGORIES
// ======================================
export const getCategories = async () => {
  const res = await axios.get(`${API}/api/categories`, {
    withCredentials: true,
  });

  return res.data;
};

// ======================================
// 👁 GET SINGLE CATEGORY (BY ID)
// ======================================
export const getSingleCategory = async (id) => {
  const res = await axios.get(`${API}/api/categories/${id}`, {
    withCredentials: true,
  });

  return res.data;
};

// ======================================
// 🌐 GET CATEGORY BY SLUG
// ======================================
export const getCategoryBySlug = async (slug) => {
  const res = await axios.get(`${API}/api/categories/${slug}`, {
    withCredentials: true,
  });

  return res.data;
};

// ======================================
// 🛍 GET CATEGORY + PRODUCTS BY SLUG
// ======================================
export const getCategoryWithProducts = async (slug) => {
  const res = await axios.get(
    `${API}/api/categories/${slug}/products`,
    {
      withCredentials: true,
    }
  );

  return res.data;
};

// ======================================
// ✏️ UPDATE CATEGORY
// ======================================
export const updateCategory = async ({ id, data }) => {
  const res = await axios.put(`${API}/api/categories/${id}`, data, {
    withCredentials: true,
  });

  return res.data;
};

// ======================================
// ❌ DELETE CATEGORY
// ======================================
export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API}/api/categories/${id}`, {
    withCredentials: true,
  });

  return res.data;
};