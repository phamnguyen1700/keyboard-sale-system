"use client";
import Navbar from "@/components/commons/navbar";
import Footer from "@/components/commons/homeComponents/Footer";
import React from "react";
import { ToastContainer } from "react-toastify";
import QueryProvider from "@/lib/QueryProvider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <QueryProvider>{children}</QueryProvider>
      <ToastContainer position="top-right" />
      <Footer />
    </>
  );
}
