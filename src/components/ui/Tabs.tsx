import { Tabs as AntTabs } from 'antd';
import type { TabsProps as AntTabsProps } from 'antd';
import React from 'react';
import './TabsCustom.css';

export interface TabsProps extends AntTabsProps {
  className?: string;
  style?: React.CSSProperties;
}

const Tabs: React.FC<TabsProps> = ({ className, style, ...rest }) => {
  return (
    <AntTabs
      className={`custom-product-tabs ${className || ''}`}
      style={{ ...style, justifyContent: 'center' }}
      centered
      tabBarGutter={64}
      {...rest}
    />
  );
};

export default Tabs;    