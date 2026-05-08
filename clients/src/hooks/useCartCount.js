import { useCart } from "./useCart";
import { useAuth } from "../user/context/AuthContext";

export const useCartCount = () => {
  const { data } = useCart();

  return data?.products?.reduce(
    (total, item) => total + item.qty,
    0
  ) || 0;
};