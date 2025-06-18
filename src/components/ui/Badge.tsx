import React from 'react';
import { Badge as AntBadge, BadgeProps } from 'antd';

const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return <AntBadge {...props}>{children}</AntBadge>;
};

export default Badge; 