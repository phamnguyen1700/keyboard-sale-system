import React from "react";
import { useRouter } from "next/navigation";
import Popover from "../ui/Popover";
import CartItem from "./CartItem";
import Button from "../ui/Button";
import { CartItem as CartItemType } from "@/types/cart";
import { useCartStore } from "@/zustand/services/cart/cart";

interface PopoverCartProps {
  cartItems: (CartItemType & { image?: string })[];
  children: React.ReactNode;
}

const PopoverCart: React.FC<PopoverCartProps> = ({ cartItems, children }) => {
  const total = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const router = useRouter();
  const { checkout } = useCartStore();
  const [checkingOut, setCheckingOut] = React.useState(false);
  const isCartEmpty = cartItems.length === 0;

  const handleOrderNow = async () => {
    if (isCartEmpty || checkingOut) return;
    setCheckingOut(true);
    try {
      const res = await checkout();
      if (res && res.qRimg && res.orderId) {
        const qrCompact = res.qRimg.replace("template=qronly", "template=compact");
        router.push(`/ecomerce/checkout?orderId=${res.orderId}&qrUrl=${encodeURIComponent(qrCompact)}`);
      }
    } catch {
      // handle error
    }
    setCheckingOut(false);
  };

  return (
    <Popover
      placement="bottom"
      trigger="click"
      content={
        <div style={{ minWidth: 320 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Cart</div>
          <div style={{ maxHeight: 300, overflowY: "auto" }}>
            {isCartEmpty ? (
              <div style={{ textAlign: "center", padding: 16 }}>No items in cart.</div>
            ) : (
              cartItems.map((item) => <CartItem key={item.id} {...item} />)
            )}
          </div>
          <div style={{ paddingTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontWeight: 600, fontSize: 16 }}>Total: ${total.toFixed(2)}</div>
            <Button
              type="primary"
              size="small"
              style={{ padding: "0 18px", height: 32, background: isCartEmpty ? "#ccc" : "black", opacity: isCartEmpty ? 0.5 : 1, cursor: isCartEmpty ? "not-allowed" : "pointer" }}
              disabled={isCartEmpty || checkingOut}
              onClick={handleOrderNow}
            >
              {checkingOut ? "Processing..." : "Order Now"}
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