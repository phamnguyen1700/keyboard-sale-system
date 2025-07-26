
import React from "react";
import { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/zustand/services/cart/cart";
import Image from "next/image";

interface CartItemProps extends Omit<CartItemType, "productId"> {
  image?: string;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  productName,
  unitPrice,
  quantity,
  image,
}) => {
  const { updateItem, removeItem, loading } = useCartStore();

  const handleUpdate = (newQuantity: number) => {
    if (newQuantity > 0 && !loading) {
      updateItem(id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (!loading) {
      removeItem(id);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 0", borderBottom: "1px solid #f0f0f0", minHeight: 56 }}>
      {image && (
        <Image
          src={image}
          alt={productName}
          width={48}
          height={48}
          style={{ borderRadius: 8, objectFit: "cover" }}
        />
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-start", minHeight: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontWeight: 500 }}>{productName}</div>
          <div style={{ fontSize: 12, color: "#888" }}>x{quantity}</div>
        </div>
        {/* Quantity controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <button
            style={{ border: "none", background: "#eee", borderRadius: 6, width: 24, height: 24, cursor: "pointer" }}
            onClick={() => handleUpdate(quantity - 1)}
            disabled={loading || quantity <= 1}
          >
            -
          </button>
          <span style={{ minWidth: 24, textAlign: "center" }}>{quantity}</span>
          <button
            style={{ border: "none", background: "#eee", borderRadius: 6, width: 24, height: 24, cursor: "pointer" }}
            onClick={() => handleUpdate(quantity + 1)}
            disabled={loading}
          >
            +
          </button>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", minHeight: 48 }}>
        <div style={{ fontWeight: 600, fontSize: 16 }}>${(unitPrice).toFixed(2)}</div>
        <button
          style={{ marginTop: 8, border: "none", background: "#ff4d4f", color: "white", borderRadius: 6, padding: "2px 8px", cursor: "pointer", fontSize: 12 }}
          onClick={handleRemove}
          disabled={loading}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;