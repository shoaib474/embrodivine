import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 📥 SUBMIT QUOTE (Public - with attachments)
export const createQuote = async (formData) => {
  const res = await axios.post(`${API}/api/quotes`, formData, {
    withCredentials: true,
  });
  return res.data;
};

// 📋 GET ALL QUOTES (Admin)
export const getQuotes = async () => {
  const res = await axios.get(`${API}/api/quotes`, {
    withCredentials: true,
  });
  return res.data;
};

// 🔍 GET SINGLE QUOTE (Admin)
export const getQuoteById = async (id) => {
  const res = await axios.get(`${API}/api/quotes/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// ✏️ UPDATE QUOTE (Admin)
export const updateQuote = async (id, data) => {
  const res = await axios.put(`${API}/api/quotes/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
};

// 🔄 UPDATE QUOTE STATUS (Admin)
export const updateQuoteStatus = async (id, status) => {
  const res = await axios.patch(
    `${API}/api/quotes/${id}/status`,
    { status },
    {
      withCredentials: true,
    },
  );
  return res.data;
};

// ❌ DELETE QUOTE (Admin)
export const deleteQuote = async (id) => {
  const res = await axios.delete(`${API}/api/quotes/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// 🧹 DELETE MULTIPLE QUOTES (Admin)
export const deleteSelectedQuotes = async (ids) => {
  const res = await axios.post(
    `${API}/api/quotes/delete-selected`,
    { ids },
    {
      withCredentials: true,
    },
  );
  return res.data;
};
