import { useQuery } from "@tanstack/react-query";
import { fetchItemData } from "../api/api";

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItemData,
    staleTime: 1000 * 60 * 2,
  });
};
