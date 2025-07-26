"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Row, Col, Typography, Divider } from "antd";
import { useCartStore } from "@/zustand/services/cart/cart";
import CartItem from "@/components/commons/CartItem";
import Image from "next/image";

const { Title } = Typography;

// Component that uses useSearchParams
function CheckoutContent() {
  const { cart } = useCartStore();
  const searchParams = useSearchParams();
  const qrUrl = searchParams.get("qrUrl");
  const orderId = searchParams.get("orderId");

  const cartItems = cart?.items || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <Title level={2} style={{ marginBottom: 32 }}>
        Checkout
      </Title>
      <Row gutter={48}>
        <Col xs={24} md={14}>
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 8px #eee",
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              Your Cart
            </Title>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: "center", color: "#888", padding: 32 }}>
                No items in cart.
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  image={"/images/sakura.png"}
                />
              ))
            )}
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 18 }}>
                Total: ${cart?.totalPrice?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </Col>
        <Col xs={24} md={10}>
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 24,
              boxShadow: "0 2px 8px #eee",
              minHeight: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Title level={4} style={{ marginBottom: 16 }}>
              Payment QR Code
            </Title>
            {qrUrl && orderId ? (
              <>
                <Image
                  src={qrUrl}
                  alt="QR Code"
                  width={400}
                  height={400}
                  style={{
                    borderRadius: 16,
                    marginBottom: 12,
                    objectFit: "contain",
                  }}
                />
                <div
                  style={{ textAlign: "center", fontWeight: 500, fontSize: 16 }}
                >
                  Order ID: {orderId}
                </div>
              </>
            ) : (
              <div style={{ color: "#888", textAlign: "center" }}>
                Order will appear here after you checkout.
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}

// Main component with Suspense boundary
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
