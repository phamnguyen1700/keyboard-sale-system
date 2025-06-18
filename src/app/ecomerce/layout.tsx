"use client";
import Navbar from "@/components/commons/navbar";
import Footer from "@/components/commons/homeComponents/Footer";
import React from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
