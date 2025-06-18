import React from 'react';
import { Menu as AntMenu, MenuProps } from 'antd';

const Menu: React.FC<MenuProps> & { Item: typeof AntMenu.Item; SubMenu: typeof AntMenu.SubMenu } = (props) => {
  return <AntMenu {...props} />;
};

Menu.Item = AntMenu.Item;
Menu.SubMenu = AntMenu.SubMenu;

export default Menu; 