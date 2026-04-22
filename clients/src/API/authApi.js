import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 📝 REGISTER
export const registerUser = async (data) => {
  const res = await axios.post(`${API}/auth/register`, data, {
    withCredentials: true,
  });
  return res.data;
};

// 🔐 LOGIN
export const loginUser = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data, {
    withCredentials: true,
  });
  return res.data;
};

// 🚪 LOGOUT
export const logoutUser = async () => {
  const res = await axios.post(
    `${API}/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};

// 👤 GET CURRENT USER
export const getCurrentUser = async () => {
  const res = await axios.get(`${API}/auth/dashboard`, {
    withCredentials: true,
  });
  return res.data;
};
