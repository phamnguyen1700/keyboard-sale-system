import React from 'react';
import { Dropdown, DropdownProps } from 'antd';

const CustomDropdown: React.FC<DropdownProps> = (props) => {
  return <Dropdown {...props} />;
};

export default CustomDropdown; 