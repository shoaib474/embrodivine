import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET cart items
export const getCart = async () => {
  const res = await axios.get(`${API}/api/user/cart`, {
    withCredentials: true,
  });
  return res.data;
};

// ADD to cart
export const addToCart = async (data) => {
  const res = await axios.post(`${API}/api/user/cart`, data, {
    withCredentials: true,
  });
  return res.data;
};

// UPDATE cart item (quantity change etc.)
export const updateCartItem = async (id, data) => {
  const res = await axios.put(`${API}/api/user/cart/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

// DELETE single item from cart
export const removeFromCart = async (id) => {
  const res = await axios.delete(`${API}/api/user/cart/remove/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// CLEAR full cart
export const clearCart = async () => {
  const res = await axios.delete(`${API}/api/user/cart/clear`, {
    withCredentials: true,
  });
  return res.data;
};

// GET saved items for later
export const getSavedItems = async () => {
  const res = await axios.get(`${API}/api/user/cart/saved`, {
    withCredentials: true,
  });
  return res.data;
};

// SAVE for later
export const saveForLater = async (data) => {
  const res = await axios.post(`${API}/api/user/cart/save-for-later`, data, {
    withCredentials: true,
  });
  return res.data;
};

// MOVE to cart from save for later
export const moveToCart = async (data) => {
  const res = await axios.post(`${API}/api/user/cart/move-to-cart`, data, {
    withCredentials: true,
  });
  return res.data;
};

// DELETE saved item
export const removeSavedItem = async (id) => {
  const res = await axios.delete(`${API}/api/user/cart/saved/remove/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
