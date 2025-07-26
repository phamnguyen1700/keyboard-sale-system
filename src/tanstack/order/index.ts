import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOrders, GetOrdersParams, cancelOrder, getOrderById, updateOrderDeliveryStatus, getUserOrders, confirmOrderReceived } from '@/zustand/services/order';
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

export const useUserOrdersQuery = () => {
    return useQuery<OrderList, Error>({
        queryKey: ['user-orders'],
        queryFn: () => getUserOrders(),
    });
};

export const useConfirmOrderReceivedMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        // Nhận object thay vì chỉ orderId
        mutationFn: ({
            orderId,
            customerNotes = "",
            rating = 0,
        }: { orderId: number; customerNotes?: string; rating?: number }) =>
            confirmOrderReceived(orderId, customerNotes, rating),
        onSuccess: (_data, variables) => {
            toast.success('Cảm ơn bạn đã mua hàng!');
            queryClient.invalidateQueries({ queryKey: ['user-orders'] });
            queryClient.invalidateQueries({ queryKey: ['order', variables?.orderId] });
        },
        onError: (error) => {
            toast.error('Xác nhận nhận hàng thất bại!');
            console.log("Lỗi xác nhận nhận hàng", error);
        },
    });
};
