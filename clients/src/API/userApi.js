import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// GET all users
export const getUsers = async () => {
  const res = await axios.get(`${API}/api/user`, {
    withCredentials: true,
  });

  return res.data;
};

// UPDATE user role
export const updateUserRole = async (id, role) => {
  const res = await axios.put(
    `${API}/api/user/${id}/role`,
    { role },
    {
      withCredentials: true,
    },
  );
  return res.data;
};

// DELETE user
export const deleteUser = async (id) => {
  const res = await axios.delete(`${API}/api/user/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
