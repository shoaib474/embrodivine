import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ❤️ GET favorites
export const getFavorites = async () => {
  const res = await axios.get(`${API}/api/user/favorites`, {
    withCredentials: true,
  });
  return res.data;
};

// 🔄 TOGGLE favorite (BEST PRACTICE)
export const toggleFavorite = async (productId) => {
  const res = await axios.post(
    `${API}/api/user/favorites/toggle`,
    { productId },
    { withCredentials: true },
  );
  return res.data;
};

// 🧹 CLEAR all favorites
export const clearFavorites = async () => {
  const res = await axios.delete(`${API}/api/user/favorites`, {
    withCredentials: true,
  });
  return res.data;
};
