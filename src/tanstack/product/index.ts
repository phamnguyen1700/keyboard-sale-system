import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getAllProduct,
  getProductDetail,
} from "@/zustand/services/product/product";
import { IProductFilter } from "@/types/product";

export const useProducts = (params: IProductFilter = {}) => {
  return useQuery({
    queryKey: ["product", params],
    queryFn: () => getAllProduct(params),
    placeholderData: keepPreviousData,
  });
};
export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetail(id),
    enabled: !!id,
  });
};
