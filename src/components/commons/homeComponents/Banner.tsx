import React from 'react';
import { Row, Col, Button } from 'antd';
import Image from 'next/image';

const Banner = () => (
    <div
        style={{
            borderRadius: 40,
            height: '70%',
            width: '95%',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}
    >
        <Row align="middle" justify="center" gutter={0} style={{ height: '100%' }}>
            {/* Left content */}
            <Col xs={24} md={15} style={{ padding: '38px 35px 28px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h1 style={{ fontSize: 56, fontWeight: 900, margin: 0, lineHeight: 1, letterSpacing: -2, textShadow: '2px 4px 0 lightgray' }}>
                    FREAKEYCAPS
                </h1>
                <h2 style={{ fontSize: 48, fontWeight: 800, margin: '24px 0 16px 0', lineHeight: 0.9, textShadow: '2px 4px 0 lightgray' }}>
                    FIND KEYS THAT<br />MATCH YOUR STYLE
                </h2>
                <div style={{ color: '#666', fontSize: 18, marginBottom: 32 }}>
                    Browse through our diverse range of standard and custom-made artisan keycaps
                </div>
                <Button
                    className="banner-border-radius shop-now-btn"
                    size="large"
                    style={{
                        padding: '12px 40px',
                        fontSize: 15,
                        fontWeight: 400,
                        marginBottom: 32,
                        height: 'auto',
                        width: '20%',
                    }}
                >
                    Shop Now
                </Button>
                {/* 3 options */}
                <Row gutter={0} style={{ marginTop: 32, textAlign: 'center' }}>
                  <Col flex={1} style={{ borderRight: '1px solid var(--divider-color)', padding: '0 24px' }}>
                    <div style={{ fontWeight: 600, fontSize: 35 }}>STANDARD</div>
                    <div style={{ color: '#666', fontSize: 14 }}>Purchase affordable,<br />standard keycaps</div>
                  </Col>
                  <Col flex={1} style={{ borderRight: '1px solid var(--divider-color)', borderLeft: '1px solid var(--divider-color)', padding: '0 24px' }}>
                    <div style={{ fontWeight: 600, fontSize: 35 }}>ARTISAN</div>
                    <div style={{ color: '#666', fontSize: 14 }}>Purchase more high-end products,<br />perfect for personalization</div>
                  </Col>
                  <Col flex={1} style={{ padding: '0 24px' }}>
                    <div style={{ fontWeight: 600, fontSize: 35 }}>BLINDBOX</div>
                    <div style={{ color: '#666', fontSize: 14 }}>Discover even more<br />unique designs</div>
                  </Col>
                </Row>
            </Col>
            {/* Right image */}
            <Col
                xs={24}
                md={9}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: 500,
                    padding: 0,
                }}
            >
                <Image
                    src="/images/sakura.png"
                    alt="Banner"
                    className="banner-border-radius"
                    style={{ width: '95%' }}
                    width={500}
                    height={500}
                />
            </Col>
        </Row>
    </div>
);

export default Banner;