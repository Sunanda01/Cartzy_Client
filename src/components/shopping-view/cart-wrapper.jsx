import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems, setOpenCart }) {
  const navigate = useNavigate();
  const totalAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  console.log(cartItems, "czartwrapper");
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((items) => <UserCartItemContent getCartItems={items} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount}</span>
        </div>
      </div>
      <Button
        className="rounded-sm w-full mt-6"
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCart(false);
        }}
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
