import React, { useState, useEffect } from 'react';
import { Modal, Table, Tag, Divider, Button, Modal as AntdModal, Input } from 'antd';
import { Order } from '@/types/order';
import { useUpdateOrderDeliveryStatusMutation } from '@/tanstack/order';
import { useProducts } from '@/tanstack/product';
import { useCancelOrderMutation } from '@/tanstack/order';
import { formatMoney } from '@/hooks/formatMoney';

interface OrderDetailDialogProps {
    open: boolean;
    onClose: () => void;
    order: Order | null;
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({ open, onClose, order }) => {
    const [updateStatusOpen, setUpdateStatusOpen] = useState(false);
    const [adminNotes, setAdminNotes] = useState('');
    const updateStatusMutation = useUpdateOrderDeliveryStatusMutation();
    const cancelOrderMutation = useCancelOrderMutation();
    const { data: products = [] } = useProducts();

    useEffect(() => {
        if (!open) setUpdateStatusOpen(false);
    }, [open]);

    if (!order) return null;

    const columns = [
        { title: 'Product', dataIndex: 'productName', key: 'productName', render: (text: string, record: { productId: number; productName: string }) => {
            const product = products.find(p => p.id === record.productId);
            return product?.name || text;
        } },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Unit Price', dataIndex: 'unitPrice', key: 'unitPrice', render: (v: number) => formatMoney(v) },
        { title: 'Total', dataIndex: 'totalPrice', key: 'totalPrice', render: (v: number) => formatMoney(v) },
    ];

    const handleUpdateStatus = async (newStatus: string) => {
        if (!order) return;
        try {
            await updateStatusMutation.mutateAsync({ id: order.id, status: newStatus, adminNotes });
            setUpdateStatusOpen(false);
            setAdminNotes('');
            onClose();
        } catch {
            setUpdateStatusOpen(false);
        }
    };

    const handleCancelOrder = async () => {
        if (!order) return;
        try {
            await cancelOrderMutation.mutateAsync(order.id);
            setUpdateStatusOpen(false);
            setAdminNotes('');
            onClose();
        } catch {
            setUpdateStatusOpen(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            destroyOnHidden
            title={null}
            width={800}
            footer={null}
            centered
        >
            {/* Invoice style header */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 16,
            }}>
                <span style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#222'
                }}>
                    Order #{order.orderNumber}
                </span>
                <Tag
                    style={{ marginLeft: 0, marginTop: 2 }}
                    color={order.status === 'Completed' ? 'green' : order.status === 'Cancelled' ? 'red' : 'orange'}
                >
                    {order.status}
                </Tag>
            </div>
            <Divider style={{ margin: '8px 0' }} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    columnGap: 48,
                    marginBottom: 8,
                }}
            >
                <div style={{ minWidth: '50%' }}>
                    <div><b>Customer:</b> {order.userFullName}</div>
                    <div><b>Email:</b> {order.user.email}</div>
                    <div><b>Shipping Address:</b> {order.shippingAddress}</div>
                    <div><b>Billing Address:</b> {order.billingAddress}</div>
                </div>
                <div style={{ minWidth: '50%' }}>
                    <div><b>Order Date:</b> {new Date(order.orderDate).toLocaleString()}</div>
                    <div><b>Payment Status:</b> {order.paymentStatus}</div>
                    <div><b>Payment Method:</b> {order.paymentMethod}</div>
                    <div><b>Tracking Number:</b> {order.trackingNumber}</div>
                </div>
            </div>
            <Divider style={{ margin: '8px 0' }} />
            {/* Order Items Table */}
            <h3>Order Items</h3>
            <Table
                columns={columns}
                dataSource={order.orderItems}
                rowKey="productId"
                pagination={false}
                size="small"
            />
            <Divider style={{ margin: '8px 0' }} />
            {/* Total summary */}
            <div style={{ textAlign: 'right', fontSize: 16 }}>
                <div><b>Subtotal:</b> {formatMoney(order.subtotal)}</div>
                <div><b>Tax:</b> {formatMoney(order.taxAmount)}</div>
                <div><b>Shipping:</b> {formatMoney(order.shippingFee)}</div>
                <div><b>Total Amount:</b> <span style={{ color: '#1677ff', fontWeight: 600 }}>{formatMoney(order.totalAmount)}</span></div>
            </div>
            {['Pending', 'Shipping'].includes(order.status) && (
                <div style={{ display: 'flex', gap: 12, marginTop: -35 }}>
                    <Button
                        type="primary"
                        onClick={() => setUpdateStatusOpen(true)}
                    >
                        Cập nhật trạng thái
                    </Button>
                    <Button
                        danger
                        type="primary"
                        onClick={handleCancelOrder}
                    >
                        Hủy đơn
                    </Button>
                </div>
            )}
            <AntdModal
                open={updateStatusOpen}
                onCancel={() => setUpdateStatusOpen(false)}
                destroyOnHidden
                footer={null}
                title="Cập nhật trạng thái đơn hàng"
                centered
            >
                {order.status === 'Pending' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <Input.TextArea
                            rows={2}
                            placeholder="Ghi chú cho admin (nếu có)"
                            value={adminNotes}
                            onChange={event => setAdminNotes(event.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={() => handleUpdateStatus('Shipping')}
                        >
                            Giao hàng
                        </Button>
                    </div>
                )}
                {order.status === 'Shipping' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <Input.TextArea
                            rows={2}
                            placeholder="Ghi chú cho admin (nếu có)"
                            value={adminNotes}
                            onChange={event => setAdminNotes(event.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={() => handleUpdateStatus('Delivered')}
                        >
                            Đã giao
                        </Button>
                    </div>
                )}
            </AntdModal>
        </Modal>
    );
};

export default OrderDetailDialog;
