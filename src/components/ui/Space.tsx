import React from 'react';
import { Space as AntSpace, SpaceProps } from 'antd';

const Space: React.FC<SpaceProps> = ({ children, ...props }) => {
  return <AntSpace {...props}>{children}</AntSpace>;
};

export default Space; 