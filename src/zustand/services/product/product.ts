import {
  IProductFilter,
  IProductResponse,
  IProductDetail,
} from "@/types/product";
import { get, post, put, remove } from "@/utils/Http";
import axios from "axios";

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

export const uploadProductImage = async (
  productId: number,
  file: File,
  displayOrder: number,
  altText?: string,
  isPrimary?: boolean
) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('displayOrder', displayOrder.toString());
  if (altText) formData.append('altText', altText);
  if (isPrimary !== undefined) formData.append('isPrimary', String(isPrimary));

  console.log('isFile:', file instanceof File);
  console.log('formData.get("file"):', formData.get('file'));

  const res = await axios.post(
    `https://freakycaps.click/api/products/${productId}/ProductImages`,
    formData,
    {
      headers: {
        // ❗❗❗ Đừng set Content-Type ở đây — để axios tự set với boundary
        Authorization: `Bearer ${localStorage.getItem('token')}`, // hoặc chỗ nào bạn lấy token
      },
    }
  );

  return res.data;
};


export const getProductImages = async (productId: number) => {
  const res = await get(`/products/${productId}/ProductImages`);
  return res.data;
};

export const deleteProductImage = async (productId: number, imageId: number) => {
  const res = await axios.delete(`https://freakycaps.click/api/products/${productId}/ProductImages/${imageId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};

export const updateProduct = async (product: {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
}) => {
  const res = await put(`/Product/${product.id}`, product);
  return res.data;
};

export const createProduct = async (product: {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
}) => {
  const res = await post(`/Product`, product, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};

export const deleteProduct = async (id: number) => {
  const res = await remove(`/Product/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};
