import React from 'react';
import { Card, Rate, Typography, Space, Tag } from 'antd';
import Image from 'next/image';
import Link from "next/link"; 
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  rating: number;
  price: number;
  oldPrice?: number;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  rating,
  price,
  oldPrice,
  discount,
}) => {
  const router = useRouter();
  return (
    <Card
      hoverable
      onClick={() => router.push(`/ecomerce/products/${id}`)}
      style={{ width: 290, height: 400, boxShadow: 'none', background: 'white', borderRadius: 32 }}
      cover={
        <div
          style={{
            fontWeight: 700,
            fontSize: 16,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            borderRadius: 32,
          }}
        >
          <Image
            alt={name}
            src={image}
            style={{ objectFit: 'cover' }}
            width={290}
            height={290}
          />
        </div>
      }
    >
      <Typography.Title style={{ fontWeight: 700, fontSize: 16, marginTop: -15, marginLeft: -20, marginBottom: 5 }}>
        {name}
      </Typography.Title>
      <Space align="center" style={{ marginLeft: -20, marginBottom: 0 }}>
        <Rate allowHalf disabled value={rating} style={{ fontSize: 16, color: '#FFC107' }} />
      </Space>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Title level={4} style={{ marginLeft: -20, fontWeight: 700 }}>
          ${price}
        </Typography.Title>
        {oldPrice && (
          <Typography.Text delete style={{ color: '#888', fontSize: 16, marginLeft: 8 }}>
            ${oldPrice}
          </Typography.Text>
        )}
        {discount && (
          <Tag color="red" style={{ marginLeft: 8, fontWeight: 500, borderRadius: 12, fontSize: 14, background: '#ffeaea', color: '#e53935', border: 'none' }}>
            -{discount}%
          </Tag>
        )}
      </div>
    </Card>
  );
};

export default ProductCard; 