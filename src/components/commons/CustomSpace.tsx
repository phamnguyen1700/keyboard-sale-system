import React from 'react';
import { Space, SpaceProps } from 'antd';

const CustomSpace: React.FC<SpaceProps> = ({ children, ...props }) => {
  return <Space {...props}>{children}</Space>;
};

export default CustomSpace; 