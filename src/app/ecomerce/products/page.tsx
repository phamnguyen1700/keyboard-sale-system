"use client";

import React, { useState } from "react";
import Sidebar from "@/components/commons/productComponents/sideBar";
import ProductCard from "@/components/commons/ProductCard";
import ProductPagination from "@/components/commons/productComponents/productPagination";
import { Layout, Row, Col } from "antd";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useProducts } from "@/tanstack/product";

const { Content } = Layout;

const PAGE_SIZE = 9;

const ProductPage = () => {
  const [current, setCurrent] = useState(1);
  const { data: products = [], isLoading } = useProducts({
    page: current,
    pageSize: PAGE_SIZE,
  });
  const total = products.length;
  // If your API returns total count, use it instead of products.length

  return (
    <>
      <div style={{ padding: "0px 48px 0 90px" }}>
        <Breadcrumb
          items={[
            {
              title: <Link href="/ecomerce/home">Home</Link>,
            },
            {
              title: "Casual",
            },
          ]}
        />
      </div>
      <Layout
        style={{
          background: "transparent",
          minHeight: "100vh",
          paddingLeft: 48,
        }}
      >
        <Sidebar />
        <Content style={{ padding: 32, margin: 16, height: "auto" }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              marginBottom: 12,
              marginTop: -48,
              textAlign: "left",
            }}
          >
            Casual
          </div>

          <div
            style={{ borderBottom: "var(--divider-color)", paddingBottom: 24 }}
          >
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <Row gutter={[24, 24]}>
                {products.map((product, idx) => (
                  <Col key={product.id ?? idx} xs={24} sm={12} md={8}>
                    <ProductCard
                      image={
                        product.images[0]?.imageUrl || "/images/sakura.png"
                      }
                      name={product.name}
                      rating={5}
                      price={product.price}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 24,
            }}
          >
            <ProductPagination
              current={current}
              pageSize={PAGE_SIZE}
              total={total}
              onChange={setCurrent}
            />
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default ProductPage;
