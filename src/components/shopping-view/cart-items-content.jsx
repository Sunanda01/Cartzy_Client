import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, updateCart } from "@/store/cart-slice";
import { toast } from "sonner";

function UserCartItemContent({ getCartItems }) {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productsList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleCartItemDelete(productId) {
    dispatch(deleteCart({ userId: user?.id, productId })).then((data) => {
      if (data?.payload.success) toast.success(data?.payload.msg);
    });
  }
  function handleUpdateQuantity(getCartItems, typeOfAction) {
    if (typeOfAction === "plus") {
      let getCartItem = cartItems?.items || [];
      if (getCartItem?.length) {
        const indexOfCurrentItem = getCartItem.findIndex(
          (item) => item?.productId === getCartItems?.productId
        );
        const getCurrentProductIndex = productsList.findIndex(
          (product) => product?._id === getCartItems?.productId
        );
        const getTotalStock = productsList[getCurrentProductIndex].totalStock;
        console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");
        if (indexOfCurrentItem > -1) {
          const getQuantity = getCartItem[indexOfCurrentItem].quantity;
          if (getQuantity + 1 > getTotalStock) {
            toast.info(`Only ${getTotalStock} items can be added`);
            return;
          }
        }
      }
    }
    dispatch(
      updateCart({
        userId: user?.id,
        productId: getCartItems?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItems?.quantity + 1
            : getCartItems?.quantity - 1,
      })
    ).then((data) => toast.success(data?.payload.msg));
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={getCartItems?.image}
        alt={getCartItems?.title}
        className="h-20 w-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{getCartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            varient="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={getCartItems?.quantity === 1}
            onClick={() => handleUpdateQuantity(getCartItems, "minus")}
          >
            <Minus />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{getCartItems?.quantity}</span>
          <Button
            varient="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(getCartItems, "plus")}
          >
            <Plus />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="flex flex-col items-end ">
          <p className="font-semibold">
            $
            {(
              (getCartItems?.salePrice > 0
                ? getCartItems?.salePrice
                : getCartItems?.price) * getCartItems?.quantity
            ).toFixed(2)}
          </p>
          <Trash
            onClick={() => handleCartItemDelete(getCartItems?.productId)}
            className="cursor-pointer mt-1"
            size={20}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCartItemContent;
