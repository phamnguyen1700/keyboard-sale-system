"use client";

import React, { useState } from 'react';
import CustomTable from '../../../components/commons/core/CustomTable';
import { Column } from '../../../types/table';
import { Tag, Tabs, DatePicker } from 'antd';
import { Order } from '@/types/order';
import OrderDetailDialog from '../../../components/commons/orderComponents/orderDetailDialog';
import dayjs, { Dayjs } from 'dayjs';
import { useOrdersQuery, useOrderDetailQuery } from '@/tanstack/order';

const deliveryStatuses = ['Pending', 'Shipping', 'Delivered', 'Completed', 'Cancelled'];

const OrderManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState<string>('Pending');
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);

  const { data: orders = [], isLoading } = useOrdersQuery();
  const { data: orderDetail } = useOrderDetailQuery(selectedOrderId ?? undefined);

  const filteredOrders = orders.filter(order => {
    if (order.status !== activeStatus) return false;
    const orderDate = dayjs(order.orderDate);
    if (fromDate && orderDate.isBefore(fromDate, 'day')) return false;
    if (toDate && orderDate.isAfter(toDate, 'day')) return false;
    return true;
  });

  const columns: Column<Order>[] = [
    {
      key: 'orderNumber',
      title: 'Order #',
      dataIndex: 'orderNumber',
      width: 120,
      align: 'center',
    },
    {
      key: 'userFullName',
      title: 'Customer',
      dataIndex: 'userFullName',
      width: 180,
      align: 'center',
    },
    {
      key: 'orderDate',
      title: 'Order Date',
      dataIndex: 'orderDate',
      width: 160,
      align: 'center',
      render: (record) => new Date(record.orderDate).toLocaleString(),
    },
    {
      key: 'paymentStatus',
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      width: 120,
      align: 'center',
      render: (record) => (
        <Tag color={record.paymentStatus === 'Paid' ? 'green' : 'red'}>
          {record.paymentStatus}
        </Tag>
      ),
    },
    {
      key: 'totalAmount',
      title: 'Total',
      dataIndex: 'totalAmount',
      width: 120,
      align: 'center',
      render: (record) => <span className="font-semibold text-blue-600">${record.totalAmount.toFixed(2)}</span>,
    },
  ];

  const handleRowClick = (record: Order) => {
    setSelectedOrderId(record.id);
    setDetailOpen(true);
  };

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600">Manage all customer orders</p>
        </div>
      </div>
      {/* Filter container */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-md w-full">
        <div className="flex gap-4 items-center w-full">
          <DatePicker
            value={fromDate}
            onChange={setFromDate}
            placeholder="From date"
            style={{ width: '100%' }}
            allowClear
            className="flex-1"
          />
          <DatePicker
            value={toDate}
            onChange={setToDate}
            placeholder="To date"
            style={{ width: '100%' }}
            allowClear
            className="flex-1"
          />
        </div>
      </div>
      {/* Tabs + Table container */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-md">
        <Tabs
          activeKey={activeStatus}
          onChange={setActiveStatus}
          items={deliveryStatuses.map(status => ({
            key: status,
            label: status,
          }))}
          style={{ marginBottom: 16, width: '100%' }}
          tabBarGutter={0}
        />
        <CustomTable<Order>
          columns={columns}
          records={filteredOrders}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredOrders.length,
            onChange: handlePaginationChange,
          }}
          loading={isLoading}
          bordered={true}
          size="middle"
          rowKey="id"
          onRowClick={handleRowClick}
        />
      </div>
      <OrderDetailDialog
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        order={orderDetail as Order | null}
      />
    </div>
  );
};

export default OrderManagement;
