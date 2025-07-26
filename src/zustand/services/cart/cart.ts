import { create } from "zustand";
import { CartState, Cart } from "@/types/cart";
import { get, post, put, remove } from "@/utils/Http";

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const res = await get<Cart>("Carts/active");
      set({ cart: res.data, loading: false });
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : "Failed to fetch cart";
      set({ error: errorMsg, loading: false });
    }
  },

  addItem: async (productId, quantity) => {
    set({ loading: true, error: null });
    try {
      await post<Cart>("Carts/items", { productId, quantity });
      // Refetch cart after mutation to ensure UI is in sync
      await (useCartStore.getState().fetchCart());
      set({ loading: false });
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : "Failed to add item";
      set({ error: errorMsg, loading: false });
    }
  },

  updateItem: async (itemId, quantity) => {
    set({ loading: true, error: null });
    try {
      await put<Cart>(`Carts/items/${itemId}`, { quantity });
      await (useCartStore.getState().fetchCart());
      set({ loading: false });
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : "Failed to update item";
      set({ error: errorMsg, loading: false });
    }
  },

  removeItem: async (itemId) => {
    set({ loading: true, error: null });
    try {
      await remove<Cart>(`Carts/items/${itemId}`);
      await (useCartStore.getState().fetchCart());
      set({ loading: false });
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : "Failed to remove item";
      set({ error: errorMsg, loading: false });
    }
  },

  checkout: async () => {
    set({ loading: true, error: null });
    try {
      const res = await post<{ orderId: number; qRimg: string }>("Carts/checkout");
      set({ loading: false });
      return res.data;
    } catch (e: unknown) {
      const errorMsg = e instanceof Error ? e.message : "Checkout failed";
      set({ error: errorMsg, loading: false });
      return null;
    }
  },
}));
