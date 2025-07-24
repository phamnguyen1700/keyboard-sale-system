"use client";
import React from "react";
import { Layout } from "antd";
import Sidebar from "@/components/commons/sidebar";

const { Content } = Layout;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Content 
          style={{ 
            margin: '24px 16px',
            padding: 24,
            background: '#f5f5f5',
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
