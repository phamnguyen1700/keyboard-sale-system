"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Row, Col, Typography, Button, Divider, Breadcrumb } from "antd";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { getProductDetail } from "@/zustand/services/product/product";
import { IProductDetail } from "@/types/product";
import { useCartStore } from "@/zustand/services/cart/cart";

const { Title, Text, Paragraph } = Typography;

export default function ProductDetail() {
  const { addItem, loading: cartLoading } = useCartStore();
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : String(params.id);
  const [product, setProduct] = useState<IProductDetail | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const data = await getProductDetail(id);
        setProduct(data);
      } catch {
        setProduct(null);
      }
      setLoading(false);
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }
  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">Product not found</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-20">
      <div style={{ padding: "0px 48px 0 90px" }}>
        <Breadcrumb
          items={[
            {
              title: <Link href="/ecomerce/home">Home</Link>,
            },
            {
              title: <Link href="/ecomerce/products">Products</Link>,
            },
            {
              title: product.name,
            },
          ]}
        />
      </div>
      <Row gutter={24} style={{ marginTop: 24 }} align="middle">
        {/* Left Image + Thumbnails */}
        <Col xs={24} md={12}>
          <Image.PreviewGroup>
            <div
              style={{
                display: "flex",
                gap: 16,
                height: "450px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              {/* Thumbnails - left */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 20 }}
              >
                {product.images && product.images.length > 0
                  ? product.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        style={{
                          border:
                            activeIndex === idx
                              ? "2px solid black"
                              : "1px solid #ddd",
                          borderRadius: 16,
                          padding: 4,
                          cursor: "pointer",
                          width: 120,
                          height: 120,
                        }}
                      >
                        <Image
                          src={img.imageUrl}
                          alt={product.name}
                          width="100%"
                          height="100%"
                          style={{ borderRadius: 8, objectFit: "cover" }}
                          preview={false}
                        />
                      </div>
                    ))
                  : [
                      <div
                        key={0}
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: 16,
                          padding: 4,
                          width: 120,
                          height: 120,
                        }}
                      >
                        <Image
                          src="/images/sakura.png"
                          alt={product.name}
                          width="100%"
                          height="100%"
                          style={{ borderRadius: 8, objectFit: "cover" }}
                          preview={false}
                        />
                      </div>,
                    ]}
              </div>
              {/* Main Image - right */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <Image
                  src={
                    product.images && product.images.length > 0
                      ? product.images[activeIndex]?.imageUrl ||
                        product.images[0].imageUrl
                      : "/images/sakura.png"
                  }
                  alt={product.name}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: 16, objectFit: "cover" }}
                />
              </div>
            </div>
          </Image.PreviewGroup>
        </Col>
        {/* Right Info */}
        <Col xs={24} md={12}>
          <Title level={2} style={{ marginBottom: 0, fontWeight: "bold" }}>
            {product.name}
          </Title>
          <Paragraph style={{ marginTop: 16 }}>{product.description}</Paragraph>
          <Divider
            style={{
              margin: "12px 0",
              borderBottom: "1px solid var(--divider-color)",
            }}
          />
          <div style={{ marginTop: 8 }}>
            <Title level={3} type="danger" style={{ margin: 0 }}>
              ${product.price}
            </Title>
            <Text style={{ color: "#888" }}>
              Stock: {product.stockQuantity}
            </Text>
          </div>
          <Divider
            style={{
              margin: "12px 0",
              borderBottom: "1px solid var(--divider-color)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 24,
              gap: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                border: "1.5px solid #000",
                borderRadius: 24,
                height: 33,
                width: "fit-content",
              }}
            >
              <Button
                style={{ borderRadius: 24, border: "none", height: "100%" }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <div style={{ padding: "0 16px", lineHeight: "32px" }}>
                {quantity}
              </div>
              <Button
                style={{ borderRadius: 24, border: "none", height: "100%" }}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button
              type="primary"
              size="large"
              style={{
                height: 33,
                width: 300,
                borderRadius: 24,
                backgroundColor: "black",
              }}
              loading={cartLoading}
              onClick={async () => {
                if (product) {
                  await addItem(product.id, quantity);
                }
              }}
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
          <Divider style={{ marginTop: 32 }} />
          <div style={{ marginTop: 24 }}>
            <Text type="secondary">Category: {product.categoryName}</Text>
          </div>
        </Col>
      </Row>
    </div>
  );
}
