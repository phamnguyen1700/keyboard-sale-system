import React from 'react';
import Popover from '../ui/Popover';
import CartItem from './CartItem';
import Button from '../ui/Button';

export interface CartItemType {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

interface PopoverCartProps {
  cartItems: CartItemType[];
  children: React.ReactNode;
}

const PopoverCart: React.FC<PopoverCartProps> = ({ cartItems, children }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <Popover
      placement="bottom"
      trigger="click"
      content={
        <div style={{ minWidth: 320 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Cart</div>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {cartItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 16 }}>No items in cart.</div>
            ) : (
              cartItems.map(item => <CartItem key={item.id} {...item} />)
            )}
          </div>
          <div style={{ paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Total: ${total}</div>
            <Button type="primary" size="small" style={{ padding: '0 18px', height: 32, background: 'black' }}>
              Order Now
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  );
};

export default PopoverCart; 