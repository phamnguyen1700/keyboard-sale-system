export interface CartItem {
  id: number; // cart item id
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  id: number;
  userId: number;
  createdAt: string;
  isActive: boolean;
  items: CartItem[];
  totalPrice: number;
}

export interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  checkout: () => Promise<{ orderId: number; qRimg: string } | null>;
}
