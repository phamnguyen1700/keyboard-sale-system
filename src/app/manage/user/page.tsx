"use client";

import React, { useState } from "react";
import CustomTable from '../../../components/commons/core/CustomTable';
import { Column } from '../../../types/table';
import { User } from '../../../types/user';
import { Button, Tag, Input, Space, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import UserDetailDialog from '../../../components/commons/userComponents/userDetailDialog';
import { useUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } from '@/tanstack/user';

const UserManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: users = [], refetch } = useUsersQuery();
  const createUserMutation = useCreateUserMutation();
  const updateUserMutation = useUpdateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  // Filter users by username or email
  const filteredUsers = users.filter(user =>
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
  ];

  const handlePaginationChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (values: Omit<User, 'id'>) => {
    setLoading(true);
    try {
      await createUserMutation.mutateAsync({ ...values, roles: values.roles });
      message.success('Tạo mới người dùng thành công!');
      refetch();
      handleCloseDialog();
    } catch {
      message.error('Tạo mới thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values: Partial<User>) => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await updateUserMutation.mutateAsync({ id: selectedUser.id, user: { ...values, roles: values.roles } });
      message.success('Cập nhật người dùng thành công!');
      refetch();
      handleCloseDialog();
    } catch {
      message.error('Cập nhật thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      await deleteUserMutation.mutateAsync(selectedUser.id);
      message.success('Xóa người dùng thành công!');
      refetch();
      handleCloseDialog();
    } catch {
      message.error('Xóa thất bại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage your users</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAddUser}>
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
            onClick={() => { }}
          >
            Search
          </Button>
        </div>
      </div>
      {/* Table */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 shadow-md">
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
          onRowClick={handleRowClick}
        />
      </div>
      <UserDetailDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        user={selectedUser}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default UserManagement; 