import React, { useState } from 'react';
import { Modal, Row, Col, Card, Typography, Tag, Button, Divider, Space, Timeline, Input, Rate } from 'antd';
import { Order } from '@/types/order';
import { useUserOrdersQuery, useConfirmOrderReceivedMutation, useOrderDetailQuery } from '@/tanstack/order';
import { useProducts } from '@/tanstack/product';
import { CheckCircleOutlined, ClockCircleOutlined, CarOutlined, CheckOutlined } from '@ant-design/icons';
import { formatMoney } from '@/hooks/formatMoney';

const { Title, Text } = Typography;

interface UserOrderTrackingProps {
  open: boolean;
  onClose: () => void;
}

const UserOrderTracking: React.FC<UserOrderTrackingProps> = ({ open, onClose }) => {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [customerNotes, setCustomerNotes] = useState("");
  const [rating, setRating] = useState(5);
  
  const { data: userOrders = [], isLoading } = useUserOrdersQuery();
  const { data: selectedOrder, isLoading: isDetailLoading } = useOrderDetailQuery(selectedOrderId || undefined);
  const { data: products = [] } = useProducts();
  const confirmOrderMutation = useConfirmOrderReceivedMutation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'Shipping': return 'blue';
      case 'Delivered': return 'green';
      case 'Completed': return 'green';
      case 'Cancelled': return 'red';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <ClockCircleOutlined />;
      case 'Shipping': return <CarOutlined />;
      case 'Delivered': return <CheckCircleOutlined />;
      case 'Completed': return <CheckOutlined />;
      case 'Cancelled': return <ClockCircleOutlined />;
      default: return <ClockCircleOutlined />;
    }
  };


  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : `Product ID: ${productId}`;
  };

  const getTimelineItems = (order: Order) => {
    const items = [
      {
        color: 'green',
        children: (
          <div>
            <Text strong>Đặt hàng thành công</Text>
            <br />
            <Text type="secondary">{new Date(order.orderDate).toLocaleString()}</Text>
          </div>
        ),
      },
    ];

    if (order.isShipped && order.shippedDate) {
      items.push({
        color: 'blue',
        children: (
          <div>
            <Text strong>Đã giao hàng</Text>
            <br />
            <Text type="secondary">{new Date(order.shippedDate).toLocaleString()}</Text>
            {order.trackingNumber && (
              <div>
                <Text type="secondary">Mã tracking: {order.trackingNumber}</Text>
              </div>
            )}
          </div>
        ),
      });
    }

    if (order.deliveredDate) {
      items.push({
        color: 'green',
        children: (
          <div>
            <Text strong>Đã giao đến</Text>
            <br />
            <Text type="secondary">{new Date(order.deliveredDate).toLocaleString()}</Text>
          </div>
        ),
      });
    }

    if (order.status === 'Completed') {
      items.push({
        color: 'green',
        children: (
          <div>
            <Text strong>Hoàn thành!</Text>
          </div>
        ),
      });
    }

    return items;
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Theo dõi đơn hàng"
      width={1000}
      footer={null}
      destroyOnHidden
      style={{ top: 20 }}
      styles={{ body: { maxHeight: '80vh', overflow: 'hidden' } }}
    >
      <Row gutter={24} style={{ height: '70vh' }}>
        {/* Left side - Order list */}
        <Col span={8} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Title level={4}>Danh sách đơn hàng</Title>
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }}>
            {isLoading ? (
              <div>Đang tải...</div>
            ) : userOrders.length === 0 ? (
              <div>Chưa có đơn hàng nào</div>
            ) : (
              userOrders.map((order) => (
                <Card
                  key={order.id}
                  size="small"
                  style={{
                    marginBottom: 8,
                    cursor: 'pointer',
                    border: selectedOrderId === order.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                  }}
                  onClick={() => setSelectedOrderId(order.id)}
                >
                  <div>
                    <Text strong>#{order.orderNumber}</Text>
                    <br />
                    <Text type="secondary">{new Date(order.orderDate).toLocaleDateString()}</Text>
                    <br />
                    <Tag color={getStatusColor(order.status)} icon={getStatusIcon(order.status)}>
                      {order.status}
                    </Tag>
                    <br />
                    <Text strong>{formatMoney(order.totalAmount)}</Text>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Col>

        {/* Right side - Order details */}
        <Col span={16} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {isDetailLoading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <Text type="secondary">Đang tải chi tiết đơn hàng...</Text>
            </div>
          ) : selectedOrder ? (
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 8 }}>
              <Title level={4}>Chi tiết đơn hàng #{selectedOrder.orderNumber}</Title>
              
              {/* Order status timeline */}
              <Card>
                <Title level={5}>Trạng thái đơn hàng</Title>
                <Timeline items={getTimelineItems(selectedOrder!)} />
              </Card>

              {/* Order items */}
              <Card>
                <Title level={5}>Sản phẩm đã đặt</Title>
                {selectedOrder!.orderItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <Text strong>{getProductName(item.productId)}</Text>
                      <br />
                      <Text type="secondary">Số lượng: {item.quantity}</Text>
                    </div>
                    <Text strong>{formatMoney(item.totalPrice)}</Text>
                  </div>
                ))}
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text>Tổng cộng:</Text>
                  <Text strong>{formatMoney(selectedOrder!.totalAmount)}</Text>
                </div>
              </Card>

              {/* Customer info */}
              <Card>
                <Title level={5}>Thông tin khách hàng</Title>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Họ tên:</Text>
                    <Text>{selectedOrder!.userFullName}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Email:</Text>
                    <Text>{selectedOrder!.user.email}</Text>
                  </div>
                  {selectedOrder!.trackingNumber && (
                    <div>
                      <Text strong>Mã tracking:</Text>
                      <br />
                      <Text>{selectedOrder!.trackingNumber}</Text>
                    </div>
                  )}
                </Space>
              </Card>

              {/* Confirm received button */}
              {selectedOrder!.status === 'Delivered' && (
                <Card>
                  <Title level={5}>Xác nhận nhận hàng</Title>
                  <Text>Đơn hàng đã được giao đến. Vui lòng xác nhận khi bạn đã nhận được hàng.</Text>
                  <br />
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => setConfirmDialogOpen(true)}
                    loading={confirmOrderMutation.isPending}
                    style={{ marginTop: 8 }}
                  >
                    Xác nhận đã nhận hàng
                  </Button>
                </Card>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <Text type="secondary">Chọn một đơn hàng để xem chi tiết</Text>
            </div>
          )}
        </Col>
      </Row>

      <Modal
        open={confirmDialogOpen}
        onCancel={() => setConfirmDialogOpen(false)}
        onOk={async () => {
          if (selectedOrder) {
            await confirmOrderMutation.mutateAsync({
              orderId: selectedOrder.id,
              customerNotes,
              rating,
            });
            setConfirmDialogOpen(false);
          }
        }}
        okText="Gửi xác nhận"
        cancelText="Hủy"
        title="Xác nhận nhận hàng & Đánh giá"
        confirmLoading={confirmOrderMutation.isPending}
      >
        <div style={{ marginBottom: 16 }}>
          <b>Ghi chú cho shop (tuỳ chọn):</b>
          <Input.TextArea
            value={customerNotes}
            onChange={e => setCustomerNotes(e.target.value)}
            rows={3}
            placeholder="Nhận xét về sản phẩm, đóng gói, giao hàng..."
          />
        </div>
        <div>
          <b>Đánh giá sản phẩm:</b>
          <br />
          <Rate value={rating} onChange={setRating} />
        </div>
      </Modal>
    </Modal>
  );
};

export default UserOrderTracking;
