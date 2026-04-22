import { useState } from "react";
import { downloadInvoiceApi } from "../API/orderApi";
import { saveAs } from "file-saver";

export const useInvoice = () => {
  const [loading, setLoading] = useState(false);

  const downloadInvoice = async (orderId) => {
    console.log(orderId);

    if (!orderId) {
      console.error("Order ID is required");
      return;
    }

    try {
      setLoading(true);

      const data = await downloadInvoiceApi(orderId);

      // ✅ Ensure data exists
      if (!data) {
        throw new Error("No data received from API");
      }

      // 📥 Convert to Blob
      const blob = new Blob([data], {
        type: "application/pdf",
      });

      saveAs(blob, `invoice-${orderId}.pdf`);
    } catch (error) {
      console.error("Invoice download failed:", error);

      // ✅ better debugging
      if (error.response) {
        console.error("Server Error:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  return { downloadInvoice, loading };
};
