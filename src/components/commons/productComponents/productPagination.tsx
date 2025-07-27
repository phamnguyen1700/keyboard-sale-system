"use client";
import React from "react";
import { Pagination } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface ProductPaginationProps {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({ current, pageSize, total, onChange }) => {
    return (
        <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onChange}
            showSizeChanger={false}
            showQuickJumper={false}
            showTitle={false}
            itemRender={(page, type, originalElement) => {
                const baseStyle: React.CSSProperties = {
                    border: '1px solid #eee',
                    background: '#fff',
                    borderRadius: 8,
                    padding: '6px 14px',
                    fontSize: 14,
                    fontWeight: 500,
                    minWidth: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    boxShadow: 'none',
                    outline: 'none',
                    cursor: 'pointer',
                };

                if (type === 'prev') {
                    return (
                        <button 
                            style={{ 
                                ...baseStyle,
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f0f0f0';
                                e.currentTarget.style.borderColor = '#d9d9d9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#fff';
                                e.currentTarget.style.borderColor = '#eee';
                            }}
                        >
                            <LeftOutlined />
                        </button>
                    );
                }

                if (type === 'next') {
                    return (
                        <button 
                            style={{ 
                                ...baseStyle,
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#f0f0f0';
                                e.currentTarget.style.borderColor = '#d9d9d9';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#fff';
                                e.currentTarget.style.borderColor = '#eee';
                            }}
                        >
                            <RightOutlined />
                        </button>
                    );
                }

                if (type === 'page') {
                    const isActive = current === page;
                    return (
                        <button
                            style={{
                                ...baseStyle,
                                fontWeight: isActive ? 600 : 400,
                                background: isActive ? '#f5f5f5' : '#fff',
                                boxShadow: isActive ? '0 0 0 1px #000' : 'none',
                                border: isActive ? '1px solid #000' : '1px solid #eee',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = '#f0f0f0';
                                    e.currentTarget.style.borderColor = '#d9d9d9';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) {
                                    e.currentTarget.style.background = '#fff';
                                    e.currentTarget.style.borderColor = '#eee';
                                }
                            }}
                        >
                            {page}
                        </button>
                    );
                }

                return originalElement;
            }}

            style={{ margin: '0 auto', background: 'transparent' }}
        />
    );
};

export default ProductPagination; 