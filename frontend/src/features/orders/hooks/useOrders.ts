import { useQuery } from "@tanstack/react-query";
import { orderAPI } from "../api/api";

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: orderAPI.getAll,
    staleTime: 1000 * 60 * 2,
  });
};
