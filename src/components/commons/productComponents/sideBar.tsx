"use client";

import React from 'react';
import { Layout, Collapse, Slider, Button, Row, Col } from 'antd';
import { RightOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const colorOptions = [
    '#ff0000', '#00ff00', '#ffff00', '#ffa500', '#00ffff', '#0000ff', '#800080', '#ff69b4', '#ffffff', '#000000'
];

const keyboardSizes = [
    'Single', '40%', '60%', '68%', '75%', '80%', '90%/96%', '100%'
];

const keycapStyles = [
    'Anime', 'E-Sports', 'Streamer', 'Games'
];

const Sidebar = () => (
    <Sider width={260} style={{ background: '#fff', borderRadius: 24, margin: 16, padding: 32, height: 'fit-content', boxShadow: '0 1px 8px var(--divider-color)' }}>
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--divider-color)', paddingBottom: 12 }}>
            Filters
        </div>
        <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--divider-color)' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
                    Standard
                </div>
                <b style={{ fontSize: 16, color: 'gray' }}>
                    <RightOutlined />
                </b>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
                    Artisan
                </div>
                <b style={{ fontSize: 16, color: 'gray' }}>
                    <RightOutlined />
                </b>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
                    Blind Box
                </div>
                <b style={{ fontSize: 16, color: 'gray' }}>
                    <RightOutlined />
                </b>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
                    Keyboards
                </div>
                <b style={{ fontSize: 16, color: 'gray' }}>
                    <RightOutlined />
                </b>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
                    Switches
                </div>
                <b style={{ fontSize: 16, color: 'gray' }}>
                    <RightOutlined />
                </b>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, fontWeight: 500, fontSize: 16, marginBottom: 8 }}>
                    Accessories
                </div>
                <b style={{ fontSize: 16, color: 'gray' }}>
                    <RightOutlined />
                </b>
            </div>
        </div>
        <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--divider-color)' }}>
            <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{
                    key: '1',
                    label: <span style={{ fontWeight: 500, fontSize: 16 }}>Price</span>,
                    children: (
                        <Slider
                            range
                            min={0}
                            max={10000000}
                            defaultValue={[50, 200]}
                            tooltip={{ formatter: v => v?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                        />
                    )
                }]}
            />
        </div>
        <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--divider-color)' }}>
            <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{
                    key: '1',
                    label: <span style={{ fontWeight: 500, fontSize: 16 }}>Colors</span>,
                    children: (
                        <Row gutter={[8, 8]}>
                            {colorOptions.map((color, idx) => (
                                <Col key={color} span={4}>
                                    <div style={{
                                        width: 24, height: 24, borderRadius: '50%', background: color, border: idx === 6 ? '2px solid #222' : '2px solid #eee', cursor: 'pointer', display: 'inline-block'
                                    }} />
                                </Col>
                            ))}
                        </Row>
                    )
                }]}
            />
        </div>
        <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--divider-color)' }}>
            <Collapse
                defaultActiveKey={['1']}
                ghost
                items={[{
                    key: '1',
                    label: <span style={{ fontWeight: 500, fontSize: 16 }}>Keyboard Size</span>,
                    children: (
                        <Row gutter={[8, 8]}>
                            {keyboardSizes.map((size, idx) => (
                                <Col key={size} span={8}>
                                    <Button type={idx === 4 ? 'primary' : 'default'} shape="round" style={{ width: '100%', fontSize: 10 }}>{size}</Button>
                                </Col>
                            ))}
                        </Row>
                    )
                }]}
            />
        </div>
        <Collapse
            defaultActiveKey={['1']}
            ghost
            items={[{
                key: '1',
                label: <span style={{ fontWeight: 500, fontSize: 16 }}>Keycap Styles</span>,
                children: (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {keycapStyles.map(style => (
                            <Button key={style} type="text" style={{ justifyContent: 'flex-start', textAlign: 'left' }}>{style}</Button>
                        ))}
                    </div>
                )
            }]}
        />
        <Button type="primary" block size="large" style={{ borderRadius: 24, fontWeight: 600, marginTop: 16 }}>
            Apply Filter
        </Button>
    </Sider>
);

export default Sidebar;