import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, GetOrdersParams, cancelOrder, getOrderById, updateOrderDeliveryStatus } from '@/zustand/services/order';
import { Order, OrderList } from '@/types/order';
import { toast } from 'react-toastify';

export const useOrdersQuery = (params?: GetOrdersParams) => {
    return useQuery<OrderList, Error>({
        queryKey: ['orders', params],
        queryFn: () => getOrders(params),
    });
};

export const useCancelOrderMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: number) => cancelOrder(orderId),
        onSuccess: () => {
            toast.success('Hủy đơn thành công!');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useOrderDetailQuery = (id: number | undefined) => {
    return useQuery<Order, Error>({
        queryKey: ['order', id],
        queryFn: () => getOrderById(id!),
        enabled: !!id,
    });
};

export const useUpdateOrderDeliveryStatusMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status, adminNotes }: { id: number; status: string; adminNotes?: string }) =>
            updateOrderDeliveryStatus(id, status, adminNotes),
        onSuccess: (_data, variables) => {
            toast.success('Cập nhật trạng thái thành công!');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            if (variables?.id) {
                queryClient.invalidateQueries({ queryKey: ['order', variables.id] });
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};
