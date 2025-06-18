import React from 'react';
import { Dropdown as AntDropdown, DropdownProps } from 'antd';

const Dropdown: React.FC<DropdownProps> = (props) => {
  return <AntDropdown {...props} />;
};

export default Dropdown; 