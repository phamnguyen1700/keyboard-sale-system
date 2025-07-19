import { Popover as AntPopover } from 'antd';
import React from 'react';
import type { PopoverProps as AntPopoverProps } from 'antd';

export interface PopoverProps extends AntPopoverProps {
  className?: string;
  style?: React.CSSProperties;
}

const Popover: React.FC<PopoverProps> = ({ children, className, style, ...rest }) => {
  return (
    <AntPopover {...rest} overlayClassName={className} overlayStyle={style}>
      {children}
    </AntPopover>
  );
};

export default Popover;
