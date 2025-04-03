import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart } from "@/store/cart-slice";
import { toast } from "sonner";

function UserCartItemContent({ cartItems }) {
    const dispatch=useDispatch();
    const{user}=useSelector((state)=>state.auth);
    function handleCartItemDelete(productId){
        dispatch(deleteCart({userId:user?.id,productId})).then((data)=>{
            if(data?.payload.success) toast.success(data?.payload.msg);
        });

    }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItems?.image}
        alt={cartItems?.title}
        className="h-20 w-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button
            varient="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Minus />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItems?.quantity}</span>
          <Button
            varient="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Plus />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="flex flex-col items-end ">
          <p className="font-semibold">
            $
            {((cartItems?.salePrice > 0 ? cartItems?.salePrice : cartItems?.price)*cartItems?.quantity).toFixed(2)}
          </p>
          <Trash onClick={()=>handleCartItemDelete(cartItems?.productId)} className="cursor-pointer mt-1" size={20}/>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemContent;
