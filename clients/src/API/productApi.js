import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET products
export const getProducts = async ({ pageParam = null, limit = 8 }) => {
  try {
    const res = await axios.get(`${API}/api/products`, {
      params: {
        limit,
        cursor: pageParam, // backend cursor
      },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// GET product by ID
export const getProductById = async (id) => {
  const res = await axios.get(`${API}/api/products/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// ADD product
export const addProduct = async (data) => {
  const res = await axios.post(`${API}/api/products`, data, {
    withCredentials: true,
  });
  return res.data;
};

// UPDATE product
export const updateProduct = async (id, data) => {
  const res = await axios.put(`${API}/api/products/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

// DELETE product
export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API}/api/products/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
