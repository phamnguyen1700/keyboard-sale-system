"use client";

import React from 'react';
import { Input, InputProps } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Search: AntSearch } = Input;

export interface SearchProps extends Omit<InputProps, 'prefix' | 'variant'> {
  onSearch?: (value: string) => void;
  enterButton?: boolean | React.ReactNode;
  loading?: boolean;
  allowClear?: boolean;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'navbar' | 'rounded';
}

const Search: React.FC<SearchProps> = ({
  onSearch,
  enterButton = <SearchOutlined />,
  loading = false,
  allowClear = true,
  placeholder = "Search...",
  size = 'middle',
  className = '',
  style = {},
  variant = 'default',
  ...restProps
}) => {
  // Default styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'navbar':
        return {
          background: '#f1f1f1',
          borderRadius: 24,
          border: 'none',
          boxShadow: 'none',
        };
      case 'rounded':
        return {
          background: '#f8f9fa',
          borderRadius: 8,
          border: '1px solid #e9ecef',
        };
      default:
        return {
          background: '#fff',
          borderRadius: 6,
          border: '1px solid #d9d9d9',
        };
    }
  };

  // Default sizes based on variant
  const getVariantSize = () => {
    switch (variant) {
      case 'navbar':
        return {
          height: 32,
          fontSize: 14,
        };
      case 'rounded':
        return {
          height: 40,
          fontSize: 16,
        };
      default:
        return {
          height: size === 'small' ? 24 : size === 'large' ? 40 : 32,
          fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const variantSize = getVariantSize();

  const searchStyle = {
    ...variantStyles,
    ...variantSize,
    ...style,
  };

  const searchClassName = `custom-search ${variant} ${className}`.trim();

  return (
    <AntSearch
      placeholder={placeholder}
      allowClear={allowClear}
      enterButton={enterButton}
      size={size}
      loading={loading}
      onSearch={onSearch}
      style={searchStyle}
      className={searchClassName}
      {...restProps}
    />
  );
};

export default Search;
