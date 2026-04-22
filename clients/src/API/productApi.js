import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET products
export const getProducts = async () => {
  const res = await axios.get(`${API}/api/products`, {
    withCredentials: true,
  });
  return res.data;
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
