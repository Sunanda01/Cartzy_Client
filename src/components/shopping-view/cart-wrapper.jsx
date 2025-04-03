import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemContent from "./cart-items-content";

function UserCartWrapper({cartItems }) {
     console.log(cartItems,'czartwrapper')
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((items) => 
              <UserCartItemContent cartItems={items} />
            )
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">$1000</span>
        </div>
      </div>
      <Button className="rounded-sm w-full mt-6">Checkout</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
