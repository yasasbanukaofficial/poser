import { useQuery } from "@tanstack/react-query";
import { customerAPI } from "../api/api";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customerAPI.getAll,
    staleTime: 1000 * 60 * 2,
  });
};
