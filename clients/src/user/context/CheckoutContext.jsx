import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState(null);
  console.log(checkoutData);

  return (
    <CheckoutContext.Provider value={{ checkoutData, setCheckoutData }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
