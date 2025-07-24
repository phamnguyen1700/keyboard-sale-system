import React from 'react';
import { Layout, LayoutProps } from 'antd';

const CustomLayout: React.FC<LayoutProps> = ({ children, ...props }) => {
  return <Layout {...props}>{children}</Layout>;
};

export default CustomLayout; 