export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderUser {
  id: number;
  email: string;
  fullName: string;
}

export interface Order {
  id: number;
  userId: number;
  userFullName: string;
  orderNumber: string;
  orderDate: string;
  status: string;
  paymentStatus: string;
  subtotal: number;
  taxAmount: number;
  shippingFee: number;
  totalAmount: number;
  shippingAddress: string;
  billingAddress: string;
  shippingMethod: string;
  paymentMethod: string;
  transactionId: string;
  orderItems: OrderItem[];
  trackingNumber: string;
  shippedDate: string;
  deliveredDate: string;
  isShipped: boolean;
  estimatedDelivery: string;
  user: OrderUser;
  [key: string]: unknown;
}

export type OrderList = Order[];
