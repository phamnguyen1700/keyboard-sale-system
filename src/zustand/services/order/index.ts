import { get, post, put } from '@/utils/Http';
import { OrderList } from '@/types/order';
import { Order } from '@/types/order';

export interface GetOrdersParams {
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export const getOrders = async (params?: GetOrdersParams): Promise<OrderList> => {
  const res = await get<OrderList>('Orders/all', params ? { params } : undefined);
  return res.data;
};

export const cancelOrder = async (orderId: number) => {
  return await post(`/Orders/${orderId}/cancel`);
};

export const getOrderById = async (id: number): Promise<Order> => {
  const res = await get<Order>(`Orders/${id}`);
  return res.data;
};

export const getUserOrders = async (): Promise<OrderList> => {
  const res = await get<OrderList>('Users/orders', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
  });
  return res.data;
};

export const updateOrderDeliveryStatus = async (id: number, status: string, adminNotes?: string) => {
  const body: Record<string, string> = { status };
  if (adminNotes) body.adminNotes = adminNotes;
  const res = await put(`Orders/${id}/DeliveryStatus`, body);
  return res.data;
};

export const confirmOrderReceived = async (
  orderId: number,
  customerNotes: string = "",
  rating: number = 0
) => {
  const res = await post("Users/confirm-delivery", {
    orderId,
    isDelivered: true,
    customerNotes,
    rating,
  });
  return res.data;
};
