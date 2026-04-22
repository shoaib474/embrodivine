import { useCart } from "./useCart";

export const useCartCount = () => {
  const { data } = useCart();

  // total quantity calculate karo
  const count =
    data?.products?.reduce((total, item) => total + item.qty, 0) || 0;

  return count;
};
