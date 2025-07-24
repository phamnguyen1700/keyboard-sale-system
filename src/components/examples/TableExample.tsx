"use client";

import React, { useState } from 'react';
import CustomTable from '../ui/CustomTable';
import { Column } from '../../types/table';
import { Button, Tag } from 'antd';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const TableExample: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sample data
  const sampleData: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'active',
      createdAt: '2024-01-16',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'User',
      status: 'inactive',
      createdAt: '2024-01-17',
    },
  ];

  // Column definitions
  const columns: Column<User>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: 150,
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      width: 200,
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      width: 100,
      align: 'center',
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      width: 100,
      align: 'center',
      render: (record) => (
        <Tag color={record.status === 'active' ? 'green' : 'red'}>
          {record.status}
        </Tag>
      ),
    },
    {
      key: 'createdAt',
      title: 'Created At',
      dataIndex: 'createdAt',
      width: 120,
      align: 'center',
    },
    {
      key: 'actions',
      title: 'Actions',
      width: 120,
      align: 'center',
      render: (record) => (
        <div className="flex gap-2">
          <Button size="small" type="primary">
            Edit
          </Button>
          <Button size="small" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleRowClick = (record: User) => {
    console.log('Row clicked:', record);
    // Handle row click - could open modal, navigate, etc.
  };

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
    // Here you would typically fetch new data from API
    console.log('Page changed:', page, 'Size:', size);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Custom Table Example</h2>
      <CustomTable<User>
        columns={columns}
        records={sampleData}
        onRowClick={handleRowClick}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: sampleData.length,
          onChange: handlePaginationChange,
        }}
        loading={false}
        bordered={true}
        size="middle"
      />
    </div>
  );
};

export default TableExample; 