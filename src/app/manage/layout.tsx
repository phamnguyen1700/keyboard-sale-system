"use client";
import React from "react";
import Navbar from "@/components/commons/navbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <section>
        {children}
      </section>
    </>
  );
}
