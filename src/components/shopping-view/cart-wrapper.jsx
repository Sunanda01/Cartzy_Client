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
  console.log(cartItems, "czartwrapper");
  return (
    <SheetContent className="sm:max-w-md flex flex-col">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-8 space-y-4  overflow-auto">
        {cartItems && cartItems.length > 0
          ? cartItems.map((items) => (
              <UserCartItemContent getCartItems={items} />
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
        className="rounded-sm w-full "
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCart(false);
        }}
      >
        Checkout
      </Button>
      <div className="flex gap-2 justify-center text-muted-foreground">
        <ArrowLeftRightIcon className="w-5 h-5" />
        <span className="text-sm font-bold">
          Pay using PAYPAL
        </span>
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;
