import React from 'react';
import { Card, Rate, Typography, Space, Tag } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatMoney } from '@/hooks/formatMoney';

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
        <div style={{ marginTop: 8 }}>
          <Typography.Title level={4} style={{ margin: 0, color: "#1677ff" }}>
            {formatMoney(price)}
          </Typography.Title>
          {oldPrice && (
            <Typography.Text delete style={{ color: "#999", fontSize: 14 }}>
              {formatMoney(oldPrice)}
            </Typography.Text>
          )}
        </div>
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