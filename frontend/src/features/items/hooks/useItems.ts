import { useQuery } from "@tanstack/react-query";
import { itemAPI } from "../api/api";

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: itemAPI.getAll,
    staleTime: 1000 * 60 * 2,
  });
};
