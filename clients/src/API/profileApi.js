import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 👤 GET PROFILE
export const getUserProfile = async () => {
  const res = await axios.get(`${API}/api/profile`, {
    withCredentials: true,
  });
  return res.data;
};

// ✏️ UPDATE PROFILE (FIXED ROUTE)
export const updateUserProfile = async (updatedData) => {
  const res = await axios.put(
    `${API}/api/profile/update`, // ✅ FIXED (same base route)
    updatedData,
    {
      withCredentials: true,
    },
  );
  return res.data;
};

// ❌ DELETE ACCOUNT
export const deleteUserAccount = async () => {
  const res = await axios.delete(`${API}/api/profile/delete-account`, {
    withCredentials: true,
  });
  return res.data;
};
