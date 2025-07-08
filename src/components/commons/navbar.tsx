"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../ui/Layout';
import Menu from '../ui/Menu';
import Input from '../ui/Input';
import Dropdown from '../ui/Dropdown';
import Space from '../ui/Space';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';
import Form from '../ui/Form';
import { Input as AntInput } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  DownOutlined,
} from '@ant-design/icons';
import Button from '../ui/Button';
import { message } from '../ui/Message';
import PopoverCart from './Cart';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogoClick = () => {
    router.push('/ecomerce/home');
  };

  const handleCartClick = () => {
    router.push('/ecomerce/cart');
  };

  const handleUserClick = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        router.push('/ecomerce/profile');
      } else {
        setIsLoginModalOpen(true);
      }
    }
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'on-sale':
        router.push('/ecomerce/on-sale');
        break;
      case 'new-arrivals':
        router.push('/ecomerce/new-arrivals');
        break;
      case 'brands':
        router.push('/ecomerce/brands');
        break;
      default:
        break;
    }
  };

  const handleShopMenuClick = (key: string) => {
    switch (key) {
      case '1':
        router.push('/ecomerce/products');
        break;
      case '2':
        router.push('/ecomerce/products/keyboards');
        break;
      case '3':
        router.push('/ecomerce/products/switches');
        break;
      case '4':
        router.push('/ecomerce/products/accessories');
        break;
      default:
        break;
    }
  };

  const shopMenu = {
    items: [
      { key: '1', label: 'All Products', onClick: () => handleShopMenuClick('1') },
      { key: '2', label: 'Keyboards', onClick: () => handleShopMenuClick('2') },
      { key: '3', label: 'Switches', onClick: () => handleShopMenuClick('3') },
      { key: '4', label: 'Accessories', onClick: () => handleShopMenuClick('4') },
    ],
  };

  const menuItems = [
    {
      key: 'shop',
      label: (
        <Dropdown menu={shopMenu} trigger={['hover']}>
          <Space>
            Shop <DownOutlined style={{ fontSize: 10 }} />
          </Space>
        </Dropdown>
      ),
    },
    { key: 'on-sale', label: 'On Sale', onClick: () => handleMenuClick('on-sale') },
    { key: 'new-arrivals', label: 'New Arrivals', onClick: () => handleMenuClick('new-arrivals') },
    { key: 'brands', label: 'Brands', onClick: () => handleMenuClick('brands') },
  ];

  return (
    <>
      {isMobile ? (
        <Header style={{
          background: '#fff',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          height: 56,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: 28, cursor: 'pointer' }} onClick={handleLogoClick}>⌨️</span>
          <Menu mode="horizontal" selectable={false} style={{ borderBottom: 'none', fontSize: 12, fontWeight: 450, minWidth: 0 }} items={menuItems} />
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: '#aaa' }} />}
            style={{ maxWidth: 180, background: '#f1f1f1', borderRadius: 24, height: 32 }}
          />
          <Space size="middle">
            <Badge count={2} size="small">
              <PopoverCart cartItems={[
                { id: 1, name: 'Keycap Sakura', image: '/images/sakura.png', price: 100, quantity: 2 },
                { id: 2, name: 'Keycap G2', image: '/images/g2.png', price: 150, quantity: 1 },
              ]}>
                <ShoppingCartOutlined
                  style={{ color: 'var(--primary-color)', cursor: 'pointer' }}
                />
              </PopoverCart>
            </Badge>
            <UserOutlined
              style={{ color: 'var(--primary-color)', cursor: 'pointer' }}
              onClick={handleUserClick}
            />
          </Space>
        </Header>
      ) : (
        <Header style={{
          background: '#fff',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          height: 80,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          justifyContent: 'center',
          gap: 20,
        }}>
          <Space align="center" size="large">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{ fontSize: 40, cursor: 'pointer' }}
                onClick={handleLogoClick}
              >
                ⌨️
              </span>
            </div>
            <Menu mode="horizontal" selectable={false} style={{ borderBottom: 'none', fontSize: 16, fontWeight: 450, width: 400 }} items={menuItems} />
            <Input
              className="custom-rounded-input"
              placeholder="Search for products..."
              prefix={<SearchOutlined style={{ color: '#aaa' }} />}
              style={{ width: 600, background: '#f1f1f1', height: 40, marginBottom: 20 }}
            />
            <Space size="large" style={{ marginLeft: 20 }}>
              <Badge count={2} size="small">
                <PopoverCart cartItems={[
                  { id: 1, name: 'Keycap Sakura', image: '/images/sakura.png', price: 100, quantity: 2 },
                  { id: 2, name: 'Keycap G2', image: '/images/g2.png', price: 150, quantity: 1 },
                ]}>
                  <ShoppingCartOutlined
                    style={{ fontSize: 24, color: 'var(--primary-color)', cursor: 'pointer' }}
                  />
                </PopoverCart>
              </Badge>
              <UserOutlined
                style={{ fontSize: 24, color: 'var(--primary-color)', cursor: 'pointer' }}
                onClick={handleUserClick}
              />
            </Space>
          </Space>
        </Header>
      )}
      <Modal
        open={isLoginModalOpen}
        onCancel={() => setIsLoginModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            // TODO: Gọi API hoặc xử lý đăng nhập ở đây
            console.log('Login values:', values);

            // Demo: Giả sử đăng nhập thành công
            localStorage.setItem('token', 'demo-token');
            message('success', 'Login successful!');
            setIsLoginModalOpen(false);
          }}
          style={{ padding: 20 }}
        >
          <Form.Item style={{ textAlign: 'center' }}>
            <b style={{ fontSize: 16, fontWeight: 600 }}>🔥🔥🔥Đăng nhập với email chính chủ để tụi mình takecare bạn tốt nhất🔥🔥🔥</b>
          </Form.Item>
          <Form.Item
            label={<b style={{ fontSize: 16, fontWeight: 600 }}>Email</b>}
            name="email"
            rules={[
              { required: true, message: 'Hãy nhập email của bạn!' },
              { type: 'email', message: 'Hãy nhập email hợp lệ!' },
            ]}
          >
            <AntInput placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label={<b style={{ fontSize: 16, fontWeight: 600 }}>Password</b>}
            name="password"
            rules={[{ required: true, message: 'Hãy nhập mật khẩu của bạn!' }]}
          >
            <AntInput.Password placeholder="Nhập mật khẩu của bạn" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: 'var(--primary-color)' }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Navbar; 