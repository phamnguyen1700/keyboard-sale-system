import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/zustand/services/product/product";

export const useProductSearch = (keyword: string) => {
  return useQuery({
    queryKey: ["product-search", keyword],
    queryFn: () => getAllProduct({ searchTerm: keyword }),
    enabled: !!keyword,
    staleTime: 60 * 1000,
  });
};
