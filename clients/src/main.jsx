import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./user/context/AuthContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CheckoutProvider } from "./user/context/CheckoutContext";

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

const queryCLient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryCLient}>
    <AuthProvider>
      <CheckoutProvider>
        <PayPalScriptProvider
          options={{
            "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
            currency: "USD",
          }}
        >
          <App />
        </PayPalScriptProvider>
      </CheckoutProvider>
    </AuthProvider>

    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
);
