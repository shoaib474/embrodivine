import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// CREATE ORDER
export const createOrder = async (payload) => {
  const res = await axios.post(`${API}/api/orders/create-order`, payload, {
    withCredentials: true,
  });
  return res.data.id;
};

// CAPTURE ORDER (PayPal confirm)
export const captureOrder = async (payload) => {
  const res = await axios.post(`${API}/api/orders/capture-order`, payload, {
    withCredentials: true,
  });
  return res.data;
};

// MY ORDERS
export const getMyOrders = async () => {
  const res = await axios.get(`${API}/api/orders/my-orders`, {
    withCredentials: true,
  });

  return res.data;
};

// SINGLE ORDER
export const getOrderById = async (orderId) => {
  const res = await axios.get(`${API}/api/orders/${orderId}`, {
    withCredentials: true,
  });
  return res.data;
};

// ADMIN: ALL ORDERS
export const getAllOrders = async (params = {}) => {
  const res = await axios.get(`${API}/api/orders`, {
    params,
    withCredentials: true,
  });
  return res.data;
};

// UPDATE STATUS
export const updateOrderStatus = async ({ orderId, status }) => {
  const res = await axios.put(
    `${API}/api/orders/${orderId}/status`,
    {
      status,
    },
    { withCredentials: true },
  );
  return res.data;
};

// DELETE ORDER
export const deleteOrder = async (orderId) => {
  const res = await axios.delete(`${API}/api/orders/${orderId}`, {
    withCredentials: true,
  });
  return res.data;
};

export const downloadInvoiceApi = async (orderId) => {
  const response = await axios.get(`${API}/api/orders/invoice/${orderId}`, {
    responseType: "blob", // 👈 IMPORTANT (PDF file ke liye)
    withCredentials: true,
  });
  return response.data;
};
