"use client";

import Banner from "@/components/commons/homeComponents/Banner";
import FeedbackSlider from "@/components/commons/homeComponents/feedbackSlider";
import SliderCard from "@/components/commons/homeComponents/sliderCard";
import { useProducts } from "@/tanstack/product";

export default function Home() {
  const { data: products = [], isLoading } = useProducts();

  return (
    <div className="min-h-screen">
      <Banner />
      <div
        style={{
          border: "none",
          borderTop: "1.5px solid #e0e0e0",
          margin: "48px auto",
          width: "90%",
          maxWidth: 1400,
        }}
      >
        <SliderCard
          title="NEW ARRIVALS"
          products={products}
          isLoading={isLoading}
        />
      </div>

      <div
        style={{
          border: "none",
          borderTop: "1.5px solid #e0e0e0",
          margin: "-64px auto",
          width: "90%",
          maxWidth: 1400,
        }}
      >
        <SliderCard
          title="BEST SELLER"
          products={products}
          isLoading={isLoading}
        />
      </div>
      <FeedbackSlider />
    </div>
  );
}
