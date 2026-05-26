import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// ➕ CREATE COUPON (ADMIN)
export const createCoupon = async (data) => {
  const res = await axios.post(`${API}/api/coupons`, data, {
    withCredentials: true,
  });

  return res.data;
};

// 📥 GET ALL COUPONS (ADMIN)
export const getCoupons = async () => {
  const res = await axios.get(`${API}/api/coupons`, {
    withCredentials: true,
  });

  return res.data;
};

// 👁 GET SINGLE COUPON (ADMIN)
export const getSingleCoupon = async (id) => {
  const res = await axios.get(`${API}/api/coupons/${id}`, {
    withCredentials: true,
  });

  return res.data;
};

// ✏️ UPDATE COUPON (ADMIN)
export const updateCoupon = async ({ id, data }) => {
  const res = await axios.put(`${API}/api/coupons/${id}`, data, {
    withCredentials: true,
  });

  return res.data;
};

// ❌ DELETE COUPON (ADMIN)
export const deleteCoupon = async (id) => {
  const res = await axios.delete(`${API}/api/coupons/${id}`, {
    withCredentials: true,
  });

  return res.data;
};

// 🎟 VALIDATE / APPLY COUPON (USER)
export const validateCoupon = async (data) => {
  const res = await axios.post(`${API}/api/coupons/validate`, data, {
    withCredentials: true,
  });

  return res.data;
};
