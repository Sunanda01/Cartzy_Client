import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemContent from "./cart-items-content";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRightIcon } from "lucide-react";

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
  return (
    <SheetContent className="sm:max-w-md flex flex-col">
      <SheetHeader>
        <SheetTitle className="flex flex-row gap-3">
          <img src="/cartzy.svg" alt="Cartzy Logo" className="w-8 h-8" />
          <span className="text-xl font-bold">Your Cart</span>
        </SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4  overflow-auto">
        {cartItems && cartItems.length > 0
          ? cartItems.map((items) => (
              <UserCartItemContent key={items._id} getCartItems={items} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4 flex-1">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
      <Button
        className={`${
          cartItems && cartItems.length === 0 ? "cursor-none" : " "
        }rounded-sm w-full `}
        disabled={cartItems && cartItems.length === 0}
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCart(false);
        }}
      >
        Checkout
      </Button>
      <div className="flex gap-2 justify-center text-muted-foreground">
        <ArrowLeftRightIcon className="w-5 h-5" />
        <span className="text-sm font-bold">Pay using PAYPAL</span>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
