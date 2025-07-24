"use client";
import React from "react";
import Slider from "react-slick";
import ProductCard from "@/components/commons/ProductCard";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "antd";
import { useRouter } from "next/navigation";

// Right Arrow
const RightAr = styled.div`
  font-size: 0;
  line-height: 0;
  top: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: transparent;
  border: none;
  outline: 0;
  position: absolute;
  right: -40px;
  z-index: 1;

  &::before {
    content: "→" !important;
    font-size: 30px;
    line-height: 1;
    color: black;
    background: none;
    width: 35px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 4px 8px 8px;
    border: solid 1px #d2d2d2;
    border-bottom: 3px solid var(--primary-color, #222);
  }

  &:hover::before {
    border-bottom: 2px var(--primary-color, #222);
    color: var(--primary-color, #222);
    background: var(--secondary-color);
  }
`;

export const RightArrow = ({
  style,
  onClick,
}: {
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  return <RightAr style={style} onClick={onClick} />;
};

// Left Arrow (tương tự)
const LeftAr = styled.div`
  font-size: 0;
  line-height: 0;
  top: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: transparent;
  outline: 0;
  position: absolute;
  left: -55px;
  z-index: 1;

  &::before {
    content: "←" !important;
    font-size: 30px;
    line-height: 1;
    color: black;
    background: none;
    width: 35px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px 4px 8px 8px;
    border: solid 1px #d2d2d2;
    border-bottom: 3px solid var(--primary-color, #222);
  }

  &:hover::before {
    border-bottom: 2px var(--primary-color, #222);
    color: var(--primary-color, #222);
    background: var(--secondary-color);
  }
`;

export const LeftArrow = ({
  style,
  onClick,
}: {
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  return <LeftAr style={style} onClick={onClick} />;
};

const settings = {
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  nextArrow: <RightArrow />,
  prevArrow: <LeftArrow />,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 1 },
    },
  ],
};

import { IProduct } from "@/types/product";

interface SliderCardProps {
  title?: string;
  products?: IProduct[];
  isLoading?: boolean;
}

const SliderCard = ({ title, products = [], isLoading }: SliderCardProps) => {
  const router = useRouter();

  return (
    <div style={{ width: "100%", marginTop: 0, padding: "32px 0" }}>
      {title && (
        <h1
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: 500,
            marginBottom: 32,
            color: "var(--primary-color)",
          }}
        >
          {title}
        </h1>
      )}
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>
      ) : (
        <Slider {...settings} lazyLoad="ondemand">
          {products.map((product, idx) => (
            <div key={product.id ?? idx} style={{ padding: "0 12px" }}>
              <ProductCard
                id={product.id}
                image={product.images[0]?.imageUrl || "/images/sakura.png"}
                name={product.name}
                rating={5} // Default rating, adjust if you have a rating field
                price={product.price}
              />
            </div>
          ))}
        </Slider>
      )}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <Button
          className="banner-border-radius primary-btn"
          size="large"
          style={{
            background: "white",
            color: "black",
            padding: "12px 40px",
            fontSize: 15,
            fontWeight: 500,
            marginBottom: 32,
            height: "auto",
            width: "20%",
          }}
          onClick={() => router.push("/ecomerce/products")}
        >
          View All
        </Button>
      </div>
    </div>
  );
};
export default SliderCard;
