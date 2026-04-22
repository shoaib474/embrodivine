import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useClearCart } from "../../hooks/useCart";
import { captureOrder, createOrder } from "../../API/orderApi";

const API = import.meta.env.VITE_API_URL;

const PayPalButton = ({ amount, onSuccess, cartItems, customer }) => {
  const { mutate: clearCart, isPending: isClearingCart } = useClearCart();
  const [{ isPending }] = usePayPalScriptReducer();
  const navigate = useNavigate();

  // ✅ Validate amount before rendering
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    return <p className="text-red-500 text-sm">Invalid payment amount.</p>;
  }

  return (
    <div>
      {/* ✅ Loading state */}
      {isPending && (
        <div className="text-center text-gray-500 py-4">
          Loading payment options...
        </div>
      )}

      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={async () => {
          try {
            const orderId = await createOrder({
              amount,
              cartItems,
              customer,
            });

            if (!orderId) {
              throw new Error("Order ID not received");
            }

            return orderId;
          } catch (err) {
            console.error("Create Order Error:", err);
            toast.error("Could not initiate payment. Please try again.");
            throw err;
          }
        }}
        onApprove={async (data) => {
          try {
            const res = await captureOrder({
              orderID: data.orderID,
            });

            if (res?.success) {
              clearCart();
              toast.success("Payment Successful! 🎉");

              if (onSuccess) onSuccess(res);
              navigate("/order-success");
            } else {
              toast.error("Payment could not be verified.");
            }
          } catch (err) {
            console.error("Capture Error:", err);
            toast.error("Payment capture failed. Contact support.");
          }
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
          toast.error("Payment failed. Please try again or contact support.");
        }}
        onCancel={() => {
          toast("Payment cancelled.", { icon: "ℹ️" }); // ✅ cancel bhi handle karo
        }}
      />
    </div>
  );
};

export default PayPalButton;
