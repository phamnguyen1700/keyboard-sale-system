"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { message } from '../ui/Message';
import { useAuthStore } from '@/zustand/store/userAuth';

const { Sider } = Layout;

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { clearAuth } = useAuthStore();

  // Menu items based on the manage folder structure
  const menuItems = [
    {
      key: '/manage/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/manage/product',
      icon: <ShoppingOutlined />,
      label: 'Products',
    },
    {
      key: '/manage/order',
      icon: <ShoppingCartOutlined />,
      label: 'Orders',
    },
    {
      key: '/manage/user',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: '/manage/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const userMenu = {
    items: [
      {
        key: 'ecomerce',
        label: 'Back to Ecomerce Site',
        icon: <ProfileOutlined />,
        onClick: () => router.push('/ecomerce/home'),
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />,
        onClick: () => {
          clearAuth();
          message('success', 'Đăng xuất thành công!');
          router.push('/ecomerce/home');
        },
      },
    ],
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  const getSelectedKey = () => {
    // Find the menu item that matches the current pathname
    const selectedItem = menuItems.find(item => pathname.startsWith(item.key));
    return selectedItem ? [selectedItem.key] : [];
  };

  return (
    <Sider
      width={250}
      className="min-h-screen bg-white border-r border-gray-200"
      style={{
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* Admin User Header */}
      <div className="p-4 border-b border-gray-200">
        <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
          <div className="flex items-center cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
            <Avatar 
              size={40} 
              icon={<UserOutlined />}
              className="bg-blue-500"
            />
            <div className="ml-3 flex-1">
              <div className="text-sm font-medium text-gray-800">Admin User</div>
              <div className="text-xs text-gray-500">admin@example.com</div>
            </div>
          </div>
        </Dropdown>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={getSelectedKey()}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-0 custom-menu"
          style={{
            backgroundColor: 'transparent',
          }}
        />
      </div>
    </Sider>
  );
};

export default Sidebar; 