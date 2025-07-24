import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Cart } from "@/types/cart";
import { get, post, put, remove } from "@/utils/Http";

export function useCart() {
  return useQuery<Cart>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await get<Cart>("Carts/active");
      return res.data;
    },
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { productId: number; quantity: number }) => {
      const res = await post<Cart>("Carts/items", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: number; quantity: number }) => {
      const res = await put<Cart>(`Carts/items/${itemId}`, { quantity });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (itemId: number) => {
      const res = await remove<Cart>(`Carts/items/${itemId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useCheckoutCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await post<Cart>("Carts/checkout");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
