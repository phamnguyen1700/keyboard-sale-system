"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Layout from "../ui/Layout";
import Menu from "../ui/Menu";
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import Space from "../ui/Space";
import Badge from "../ui/Badge";
import Modal from "../ui/Modal";
import Form from "../ui/Form";
import { Input as AntInput, AutoComplete } from "antd";
import {
  ShoppingCartOutlined,
  UserOutlined,
  SearchOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Button from "../ui/Button";
import { message } from "../ui/Message";
import PopoverCart from "./Cart";
import UserOrderTracking from "./orderComponents/userOrderTracking";
import { useCartStore } from "@/zustand/services/cart/cart";
import { useLogin } from "@/tanstack/auth/login";
import { useAuthStore } from "@/zustand/store/userAuth";
import { useRegisterMutation } from "@/tanstack/user";
import { formatMoney } from "@/hooks/formatMoney";
import { useProductSearch } from "@/hooks/useProductSearch";
import { IProduct } from "@/types/product";
import UserDetailDialog from './userComponents/userDetailDialog';

const { Header } = Layout;

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const loginMutation = useLogin();
  const registerMutation = useRegisterMutation();
  const { token, user, clearAuth } = useAuthStore();
  const [search, setSearch] = useState("");
  const { data: searchResult } = useProductSearch(search);

  const isLoggedIn = !!token;
  const isAdmin = Array.isArray(user?.roles) && user.roles.includes('Admin');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleLogoClick = () => {
    router.push("/ecomerce/home");
  };


  const handleUserMenuClick = (key: string) => {
    console.log('handleUserMenuClick called with key:', key);
    switch (key) {
      case "orders":
        console.log('Opening order tracking dialog...');
        setIsOrderTrackingOpen(true);
        break;
      case 'admin':
        router.push('/manage/order');
        break;
      case 'logout':
        clearAuth();
        message('success', 'Đăng xuất thành công!');
        router.push('/ecomerce/home');
        window.location.reload();
        break;
      default:
        break;
    }
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case "on-sale":
        router.push("/ecomerce/on-sale");
        break;
      case "new-arrivals":
        router.push("/ecomerce/new-arrivals");
        break;
      case "brands":
        router.push("/ecomerce/brands");
        break;
      default:
        break;
    }
  };

  const handleShopMenuClick = (key: string) => {
    switch (key) {
      case "1":
        router.push("/ecomerce/products");
        break;
      case "2":
        router.push("/ecomerce/products/keyboards");
        break;
      case "3":
        router.push("/ecomerce/products/switches");
        break;
      case "4":
        router.push("/ecomerce/products/accessories");
        break;
      default:
        break;
    }
  };

  const shopMenu = {
    items: [
      {
        key: "1",
        label: "All Products",
        onClick: () => handleShopMenuClick("1"),
      },
      { key: "2", label: "Keyboards", onClick: () => handleShopMenuClick("2") },
      { key: "3", label: "Switches", onClick: () => handleShopMenuClick("3") },
      {
        key: "4",
        label: "Accessories",
        onClick: () => handleShopMenuClick("4"),
      },
    ],
  };

  const userMenu = {
    items: [
      ...(isAdmin ? [] : [{ key: 'profile', label: 'View Profile', onClick: () => setIsProfileOpen(true) }]),
      { key: 'orders', label: 'Track Your Orders', onClick: () => handleUserMenuClick('orders') },
      ...(isAdmin ? [{ key: 'admin', label: 'Go to Admin Site', onClick: () => handleUserMenuClick('admin') }] : []),
      { type: 'divider' as const },
      { key: 'logout', label: 'Logout', onClick: () => handleUserMenuClick('logout') },
    ],
  };

  const menuItems = [
    {
      key: "shop",
      label: (
        <Dropdown menu={shopMenu} trigger={["hover"]}>
          <Space>
            Shop <DownOutlined style={{ fontSize: 10 }} />
          </Space>
        </Dropdown>
      ),
    },
    {
      key: "on-sale",
      label: "On Sale",
      onClick: () => handleMenuClick("on-sale"),
    },
    {
      key: "new-arrivals",
      label: "New Arrivals",
      onClick: () => handleMenuClick("new-arrivals"),
    },
    {
      key: "brands",
      label: "Brands",
      onClick: () => handleMenuClick("brands"),
    },
  ];

  const renderUserIcon = () => {
    if (isLoggedIn) {
      return (
        <Dropdown
          menu={userMenu}
          trigger={["click"]}
          placement="bottom"
          overlayStyle={{ marginTop: 8 }}
        >
          <UserOutlined
            style={{
              fontSize: isMobile ? 16 : 24,
              color: "var(--primary-color)",
              cursor: "pointer",
            }}
          />
        </Dropdown>
      );
    } else {
      return (
        <UserOutlined
          style={{
            fontSize: isMobile ? 16 : 24,
            color: "var(--primary-color)",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsLoginModalOpen(true);
          }}
        />
      );
    }
  };

  const { cart, fetchCart } = useCartStore();
  const cartItems =
    cart?.items?.map((item) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
      image: "/images/sakura.png", // Replace with actual image if available
    })) || [];

  // Fetch cart on mount to ensure cart items are loaded
  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isMobile ? (
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            height: 56,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{ fontSize: 28, cursor: "pointer" }}
            onClick={handleLogoClick}
          >
            ⌨️
          </span>
          <Menu
            mode="horizontal"
            selectable={false}
            style={{
              borderBottom: "none",
              fontSize: 12,
              fontWeight: 450,
              minWidth: 0,
            }}
            items={menuItems}
          />
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: "#aaa" }} />}
            style={{
              maxWidth: 180,
              background: "#f1f1f1",
              borderRadius: 24,
              height: 32,
            }}
          />
          <Space size="middle">
            <Badge count={cartItems.length} size="small">
              <PopoverCart cartItems={cartItems}>
                <ShoppingCartOutlined
                  style={{ color: "var(--primary-color)", cursor: "pointer" }}
                />
              </PopoverCart>
            </Badge>
            {renderUserIcon()}
          </Space>
        </Header>
      ) : (
        <Header
          style={{
            background: "#fff",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            height: 80,
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <Space align="center" size="large">
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{ fontSize: 40, cursor: "pointer" }}
                onClick={handleLogoClick}
              >
                ⌨️
              </span>
            </div>
            <Menu
              mode="horizontal"
              selectable={false}
              style={{
                borderBottom: "none",
                fontSize: 16,
                fontWeight: 450,
                width: 400,
              }}
              items={menuItems}
            />
            <AutoComplete
              style={{ width: 600, marginBottom: 20 }}
              options={
                searchResult?.map((product: IProduct) => ({
                  value: String(product.id), 
                  label: (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Image
                        src={product.images?.[0]?.imageUrl || "/images/sakura.png"}
                        alt={product.name}
                        width={40}
                        height={40}
                        style={{ objectFit: "cover", borderRadius: 4 }}
                      />
                      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ fontWeight: 500 }}>{product.name}</div>
                        <div style={{ color: "#1677ff", textAlign: "right", width: "100%" }}>
                          {formatMoney(product.price)}
                        </div>
                      </div>
                    </div>
                  ),
                })) || []
              }
              onSelect={(id) => router.push(`/ecomerce/products/${id}`)}
              onSearch={setSearch}
              value={search}
              onChange={setSearch}
            >
              <AntInput
                placeholder="Search for products..."
                prefix={<SearchOutlined style={{ color: "#aaa" }} />}
                allowClear
                style={{
                  background: "#f1f1f1",
                  height: 40,
                  borderRadius: 24,
                }}
              />
            </AutoComplete>
            <Space size="large" style={{ marginLeft: 20 }}>
              <Badge count={cartItems.length} size="small">
                <PopoverCart cartItems={cartItems}>
                  <ShoppingCartOutlined
                    style={{
                      fontSize: 24,
                      color: "var(--primary-color)",
                      cursor: "pointer",
                    }}
                  />
                </PopoverCart>
              </Badge>
              {renderUserIcon()}
            </Space>
          </Space>
        </Header>
      )}
      <Modal
        open={isLoginModalOpen}
        onCancel={() => {
          setIsLoginModalOpen(false);
          setIsRegisterMode(false);
        }}
        footer={null}
      >
        {!isRegisterMode ? (
          <Form
            layout="vertical"
            onFinish={async (values) => {
              try {
                const data = await loginMutation.mutateAsync(values);
                localStorage.setItem('token', String(data.token));
                message("success", "Login successful!");
                setIsLoginModalOpen(false);
              } catch {
                message("error", "Login failed!");
              }
            }}
            style={{ padding: 20 }}
          >
            <Form.Item style={{ textAlign: "center" }}>
              <b style={{ fontSize: 16, fontWeight: 600 }}>
                🔥🔥🔥Đăng nhập với email chính chủ để tụi mình takecare bạn tốt nhất🔥🔥🔥
              </b>
            </Form.Item>
            <Form.Item
              label={<b style={{ fontSize: 16, fontWeight: 600 }}>Email</b>}
              name="email"
              rules={[
                { required: true, message: "Hãy nhập email của bạn!" },
                { type: "email", message: "Hãy nhập email hợp lệ!" },
              ]}
            >
              <AntInput placeholder="you@example.com" />
            </Form.Item>
            <Form.Item
              label={<b style={{ fontSize: 16, fontWeight: 600 }}>Password</b>}
              name="password"
              rules={[
                { required: true, message: "Hãy nhập mật khẩu của bạn!" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
              ]}
            >
              <AntInput.Password placeholder="Nhập mật khẩu của bạn" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "var(--primary-color)" }}
                loading={loginMutation.isPending}
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <span style={{ color: "#888" }}>
                Đăng ký tài khoản để nhận nhiều ưu đãi.{' '}
                <a
                  style={{ color: "#1677ff", cursor: "pointer" }}
                  onClick={() => setIsRegisterMode(true)}
                >
                  Đăng ký
                </a>
              </span>
            </div>
          </Form>
        ) : (
          <Form
            layout="vertical"
            onFinish={async (values) => {
              try {
                await registerMutation.mutateAsync(values);
                setIsRegisterMode(false);
              } catch {
                console.log("Đăng ký thất bại!");
              }
            }}
            style={{ padding: 20 }}
          >
            <Form.Item style={{ textAlign: "center" }}>
              <b style={{ fontSize: 16, fontWeight: 600 }}>
                Đăng ký tài khoản mới
              </b>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Hãy nhập email của bạn!" },
                { type: "email", message: "Hãy nhập email hợp lệ!" },
              ]}
            >
              <AntInput placeholder="you@example.com" />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Hãy nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
                  message: "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt!",
                },
              ]}
            >
              <AntInput.Password placeholder="Nhập mật khẩu" />
            </Form.Item>
            <Form.Item
              label="Tên đăng nhập"
              name="userName"
              rules={[{ required: true, message: "Hãy nhập tên đăng nhập!" }]}
            >
              <AntInput placeholder="Tên đăng nhập" />
            </Form.Item>
            <Form.Item
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: "Hãy nhập họ tên!" }]}
            >
              <AntInput placeholder="Họ và tên" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "var(--primary-color)" }}
                loading={registerMutation.isPending}
              >
                Đăng ký
              </Button>
            </Form.Item>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <span style={{ color: "#888" }}>
                Đã có tài khoản?{' '}
                <a
                  style={{ color: "#1677ff", cursor: "pointer" }}
                  onClick={() => setIsRegisterMode(false)}
                >
                  Đăng nhập
                </a>
              </span>
            </div>
          </Form>
        )}
      </Modal>

      <UserOrderTracking
        open={isOrderTrackingOpen}
        onClose={() => {
          console.log('Closing order tracking dialog...');
          setIsOrderTrackingOpen(false);
        }}
      />

      <UserDetailDialog
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        isProfileMode
      />
    </>
  );
};

export default Navbar;
