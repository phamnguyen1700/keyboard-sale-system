import React from 'react';

interface CartItemProps {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}

const CartItem: React.FC<CartItemProps> = ({ name, image, price, quantity, color = 'brown', size = 'Large' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '8px 0', borderBottom: '1px solid #f0f0f0', minHeight: 56 }}>
      <img src={image} alt={name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', minHeight: 48 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontWeight: 500 }}>{name}</div>
          <div style={{ fontSize: 12, color: '#888' }}>x{quantity}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
          <span style={{ fontSize: 12, color: '#888' }}>Color:</span>
          <span style={{ width: 16, height: 16, borderRadius: '50%', background: color, display: 'inline-block', border: '1px solid #ccc', marginRight: 8 }}></span>
          <span style={{ fontSize: 12, color: '#888' }}>Size: {size}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', minHeight: 48 }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>${price * quantity}</div>
      </div>
    </div>
  );
};

export default CartItem; 