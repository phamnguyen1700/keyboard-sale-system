import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllProduct,
  getProductDetail,
  uploadProductImage,
  getProductImages,
  updateProduct,
  deleteProductImage,
  createProduct,
  deleteProduct,
} from "@/zustand/services/product/product";
import { IProductFilter } from "@/types/product";
import { toast } from "react-toastify";

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

export const useUploadProductImage = (productId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, displayOrder, altText, isPrimary }: { file: File; displayOrder: number; altText?: string; isPrimary?: boolean }) =>
      uploadProductImage(productId, file, displayOrder, altText, isPrimary),
    onSuccess: () => {
      toast.success("Upload thành công");
      queryClient.invalidateQueries({ queryKey: ['product', String(productId)] });
    },
    onError: () => {
      toast.error("Upload thất bại");
    }
  });
};

export const useProductImages = (productId: number) => {
  return useQuery({
    queryKey: ['product-images', productId],
    queryFn: () => getProductImages(productId),
    enabled: !!productId,
  });
};


export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (_data, variables) => {
      toast.success('Cập nhật sản phẩm thành công!');
      // Invalidate chi tiết sản phẩm
      if (variables?.id) {
        queryClient.invalidateQueries({ queryKey: ['product', String(variables.id)] });
      }
      // Nếu muốn, invalidate luôn danh sách sản phẩm
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: () => {
      toast.error('Cập nhật sản phẩm thất bại!');
    },
  });
};

export const useDeleteProductImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, imageId }: { productId: number; imageId: number }) => deleteProductImage(productId, imageId),
    onSuccess: (_data, variables) => {
      // Invalidate lại danh sách ảnh sản phẩm
      queryClient.invalidateQueries({ queryKey: ['product-images', variables.productId] });
    },
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Tạo sản phẩm thành công!');
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: () => {
      toast.error('Tạo sản phẩm thất bại!');
    },
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Xóa sản phẩm thành công!');
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
    onError: () => {
      toast.error('Xóa sản phẩm thất bại!');
    },
  });
};