import { useQuery } from "@tanstack/react-query";
import { fetchCustomerData } from "../services/api";

export const useUser = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomerData,
    staleTime: 1000 * 60 * 2,
  });
};
