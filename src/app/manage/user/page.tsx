"use client";

import React, { useState } from "react";
import CustomTable from '../../../components/commons/core/CustomTable';
import { Column } from '../../../types/table';
import { User } from '../../../types/user';
import { Button, Tag, Input, Space } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const UserManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fake data
  const fakeUsers: User[] = [
    {
      id: 1,
      email: "admin@example.com",
      username: "admin",
      roles: ["Admin"],
    },
    {
      id: 2,
      email: "user1@example.com",
      username: "user1",
      roles: ["User"],
    },
  ];

  // Filter users by username or email
  const filteredUsers = fakeUsers.filter(user =>
    (user.username || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table columns
  const columns: Column<User>[] = [
    {
      key: "id",
      title: "ID",
      dataIndex: "id",
      width: 80,
      align: "center",
    },
    {
      key: "username",
      title: "Username",
      dataIndex: "username",
      width: 180,
      render: (record) => <span className="font-medium">{record.username}</span>,
    },
    {
      key: "email",
      title: "Email",
      dataIndex: "email",
      width: 220,
      render: (record) => <span className="text-gray-700">{record.email}</span>,
    },
    {
      key: "roles",
      title: "Roles",
      dataIndex: "roles",
      width: 180,
      render: (record) => (
        <Space>
          {(record.roles || []).map(role => (
            <Tag color={role === "Admin" ? "red" : "blue"} key={role}>{role}</Tag>
          ))}
        </Space>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      width: 150,
      align: "center",
      render: (record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick={e => e.stopPropagation()}
          >
          </Button>
          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={e => e.stopPropagation()}
          >
          </Button>
        </Space>
      ),
    },
  ];

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage your users</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Add User
        </Button>
      </div>
      {/* Filter */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-md">
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Input
              placeholder="Search by username or email..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </div>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="large"
            onClick={() => {}}
          >
            Search
          </Button>
        </div>
      </div>
      {/* Table */}
      <CustomTable<User>
        columns={columns}
        records={filteredUsers}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: filteredUsers.length,
          onChange: handlePaginationChange,
        }}
        loading={false}
        bordered={true}
        size="middle"
        rowKey="id"
      />
    </div>
  );
};

export default UserManagement; 