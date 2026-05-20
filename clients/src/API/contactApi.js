import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// 📨 SUBMIT CONTACT FORM (PUBLIC)
export const submitContactForm = async (data) => {
  const res = await axios.post(`${API}/api/contact/submit`, data);
  return res.data;
};

// 📥 GET ALL CONTACTS (ADMIN)
export const getContacts = async () => {
  const res = await axios.get(`${API}/api/contact`, {
    withCredentials: true,
  });
  return res.data;
};

// 👁 GET SINGLE CONTACT
export const getSingleContact = async (id) => {
  const res = await axios.get(`${API}/api/contact/${id}`, {
    withCredentials: true,
  });
  return res.data;
};

// ADMIN REPLY TO CONTACT
export const replyToContact = async ({ id, replyText }) => {
  const res = await axios.post(
    `${API}/api/contact/${id}/reply`,
    { replyText },
    {
      withCredentials: true,
    },
  );
  return res.data;
};

// ✏️ UPDATE CONTACT STATUS
export const updateContactStatus = async ({ id, status }) => {
  const res = await axios.put(
    `${API}/api/contact/${id}/status`,
    {
      status,
    },
    {
      withCredentials: true,
    },
  );
  return res.data;
};

// ❌ DELETE CONTACT
export const deleteContact = async (id) => {
  const res = await axios.delete(`${API}/api/contact/${id}`, {
    withCredentials: true,
  });
  return res.data;
};
