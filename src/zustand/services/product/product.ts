import {
  IProductFilter,
  IProductResponse,
  IProductDetail,
} from "@/types/product";
import { get } from "@/utils/Http";

export const getAllProduct = async (filter: IProductFilter = {}) => {
  const res = await get<IProductResponse>("Product", {
    params: filter,
  });
  return res.data;
};
export const getProductDetail = async (id: string) => {
  const res = await get<IProductDetail>(`Product/${id}`);
  return res.data;
};
