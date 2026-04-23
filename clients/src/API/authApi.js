import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 📝 REGISTER
export const registerUser = async (data) => {
  const res = await axios.post(`${API}/api/auth/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

// 🔐 LOGIN
export const loginUser = async (data) => {
  const res = await axios.post(`${API}/api/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

// 🚪 LOGOUT
export const logoutUser = async () => {
  const res = await axios.post(
    `${API}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};

// 👤 GET CURRENT USER
export const getCurrentUser = async () => {
  const res = await axios.get(`${API}/api/auth/dashboard`, {
    withCredentials: true,
  });
  return res.data;
};
