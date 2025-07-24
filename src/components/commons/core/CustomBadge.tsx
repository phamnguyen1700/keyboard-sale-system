import React from 'react';
import { Badge, BadgeProps } from 'antd';

const CustomBadge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return <Badge {...props}>{children}</Badge>;
};

export default CustomBadge; 