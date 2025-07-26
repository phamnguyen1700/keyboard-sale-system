'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Row, Col, Typography, Rate, Tag, Button, Divider, Breadcrumb, Tabs } from 'antd';
import Image from '@/components/ui/Image';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import FeedbackCard from '@/components/commons/FeedbackCard';
import { IProduct } from '@/types/product';

const { Title, Text, Paragraph } = Typography;

const fakeData = [
    {
        id: 2,
        name: 'Artisan Keycap - Dragon',
        description: 'A unique artisan keycap shaped like a dragon.',
        price: 260,
        oldPrice: 300,
        discount: 40,
        rating: 4.5,
        stockQuantity: 10000,
        categoryId: 1,
        categoryName: 'Keycap Sets',
        images: ['/images/sakura.png', '/images/google-pay.png', '/images/visa.png'],
    },
];

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('Large');
    const [selectedColor, setSelectedColor] = useState('brown');
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const found = fakeData.find((item) => item.id === Number(id));
        setProduct(found || null);
    }, [id]);

    // Dữ liệu feedback mẫu
    const feedbacks = [
        { name: 'Phuc D.', verified: true, content: 'I absolutely love this custom made skibidi toilet keycap set .', rating: 5 },
        { name: 'Lam S.', verified: true, content: 'The Special Edition Pekora set is amazing! So cute.', rating: 5 },
        { name: 'Hung H.', verified: true, content: 'This Sorasaki Hina Themed set is incredible!', rating: 4 },
        { name: 'Shadow T.', verified: true, content: 'I just love Latinas.', rating: 4 },
        { name: 'Jinx.', verified: true, content: 'This Ekko themed keycap set is soooo cute.', rating: 5 },
        { name: 'Sonic T.', verified: true, content: 'Nice caps!', rating: 4 },
    ];

    if (!product) {
        return <div className="text-center py-20 text-red-500">Product not found</div>;
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
                            title: <Link href="/ecomerce/products">Casual</Link>,
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
                        <div style={{ display: 'flex', gap: 16, height: '450px', width: '100%', justifyContent: 'space-between' }}>
                            {/* Thumbnails - nằm bên trái */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                {product.images.map((img: string, idx: number) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveIndex(idx)}
                                        style={{
                                            border: activeIndex === idx ? '2px solid black' : '1px solid #ddd',
                                            borderRadius: 16,
                                            padding: 4,
                                            cursor: 'pointer',
                                            width: 120,
                                            height: 120,
                                        }}
                                    >
                                        <Image  
                                            src={img}
                                            alt={`Product image ${idx + 1}`}
                                            width="100%"
                                            height="100%"
                                            style={{ borderRadius: 8, objectFit: 'cover' }}
                                            preview={false}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Main Image - nằm bên phải */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <Image
                                    src={product.images[activeIndex]}
                                    alt={product.name}
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: 16, objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </Image.PreviewGroup>
                </Col>

                {/* Right Info */}
                <Col xs={24} md={12}>
                    <Title level={2} style={{ marginBottom: 0, fontWeight: 'bold' }}>{product.name}</Title>
                    <SpaceBetween>
                        <Rate allowHalf disabled value={product.rating} />
                        <Text type="secondary">{product.rating}/5</Text>
                    </SpaceBetween>

                    <SpaceBetween style={{ marginTop: 8 }}>
                        <Title level={3} type="danger" style={{ margin: 0 }}>${product.price}</Title>
                        {product.oldPrice && (
                            <>
                                <Text delete style={{ marginLeft: 8 }}>${product.oldPrice}</Text>
                                <Tag color="red" style={{ marginLeft: 8 }}>-{product.discount}%</Tag>
                            </>
                        )}
                    </SpaceBetween>

                    <Paragraph style={{ marginTop: 16 }}>{product.description}</Paragraph>

                    <div style={{ marginTop: 24 }}>
                        <Text strong>Select Colors</Text>
                        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                            {['brown', 'green', 'navy'].map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        backgroundColor: color,
                                        cursor: 'pointer',
                                        border: selectedColor === color ? '2px solid black' : '1px solid #ccc',
                                    }}
                                />
                            ))}
                        </div>
                        <Divider style={{ margin: '12px 0', borderBottom: '1px solid var(--divider-color)' }} />

                    </div>

                    <div style={{ marginTop: 24 }}>
                        <Text strong>Choose Size</Text>
                        <div style={{ marginTop: 8 }}>
                            {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                                <Button
                                    key={size}
                                    type={selectedSize === size ? 'primary' : 'default'}
                                    onClick={() => setSelectedSize(size)}
                                    style={{
                                        width: 100,
                                        marginRight: 8,
                                        borderRadius: 20,
                                    }}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <Divider style={{ margin: '12px 0', borderBottom: '1px solid var(--divider-color)' }} />


                    <div style={{ display: 'flex', alignItems: 'center', marginTop: 24, gap: 16 }}>
                        <div style={{ display: 'flex', border: '1.5px solid #000', borderRadius: 24, height: 33, width: 100 }}>
                            <Button style={{ borderRadius: 24, border: 'none', height: '100%' }} icon={<MinusOutlined />} onClick={() => setQuantity(Math.max(1, quantity - 1))} />
                            <div style={{ padding: '0 16px', lineHeight: '32px' }}>{quantity}</div>
                            <Button style={{ borderRadius: 24, border: 'none', height: '100%' }} icon={<PlusOutlined />} onClick={() => setQuantity(quantity + 1)} />
                        </div>
                        <Button type="primary" size="large" style={{ height: 33, width: 300, borderRadius: 24, backgroundColor: 'black' }}>
                            Add to Cart
                        </Button>
                    </div>

                    <Divider style={{ marginTop: 32 }} />
                </Col>
            </Row>
            {/* Tabs ở dưới phần chi tiết sản phẩm */}
            <div style={{ marginTop: 48 }}>
                <Tabs
                    className="custom-product-tabs"
                    defaultActiveKey="details"
                    items={[
                        {
                            key: 'details',
                            label: 'Product Details',
                            children: (
                                <div style={{ padding: '32px 0' }}>
                                    <Title level={3}>Product Details</Title>
                                    <Paragraph>{product.description}</Paragraph>
                                    {/* Thêm thông tin chi tiết sản phẩm ở đây */}
                                </div>
                            ),
                        },
                        {
                            key: 'reviews',
                            label: 'Rating & Reviews',
                            children: (
                                <div style={{ padding: '32px 0' }}>
                                    <Title level={3}>All Reviews ({feedbacks.length})</Title>
                                    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                                        {feedbacks.map((fb, idx) => (
                                            <div key={idx} style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', width: 400 }}>
                                                <FeedbackCard {...fb} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ),
                        },
                        {
                            key: 'faqs',
                            label: 'FAQs',
                            children: (
                                <div style={{ padding: '32px 0' }}>
                                    <Title level={3}>FAQs</Title>
                                    <Paragraph>Frequently asked questions will be shown here.</Paragraph>
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
}

// Utility component
const SpaceBetween = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }}>{children}</div>
);
