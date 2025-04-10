import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart } from "@/store/cart-slice";
import { toast } from "sonner";
import { setProductDetails } from "@/store/product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { addReview, getReviews } from "@/store/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // console.log(getCurrentProductId, "idindetail");
    console.log(cartItems, "cart itemssssssssssss");
    let getCartItem = cartItems.items || [];
    if (getCartItem.length) {
      const indexOfCurrentItem = getCartItem.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItem[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.info(`Only ${getTotalStock} items can be added`);
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      console.log(data);
      if (data?.payload.success) {
        toast.success(data?.payload.msg);
        dispatch(fetchCart(user?.id));
      } else {
        toast.error(data?.payload.msg);
      }
    });
  }
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast.success("Review added successfully!");
      }
      else{
        toast.info("You have already reviwed the product")
      }
    });
  }
    useEffect(() => {
      if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  console.log(reviews, "reviews");
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12  max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="font-extrabold text-3xl">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-xl mt-2 mb-5">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : null
              } text-lg font-semibold text-primary`}
            >
              ${productDetails?.price}
            </span>
            {productDetails?.salePrice > 0 ? (
              <span className="text-lg font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </span>
            ) : null}
          </div>
          <div className="flex gap-2 mt-2 items-center">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">({averageReview.toFixed(2)})</span>
          </div>
          <div className="mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">
                Out Of Stock
              </Button>
            ) : (
              <Button
                className="w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="font-bold text-xl mb-4">Reviews</h2>
            <div className="grid gap-6">
            {reviews && reviews.length>0?(reviews.map((review)=>(
              <div className="flex gap-4">
              
              <Avatar className="w-10 h-10 border">
                <AvatarFallback> {review?.userName[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  
                  <h3 className="font-bold">{review?.userName}</h3>
                </div>
                <div className="flex items-center gap-0.5">
                <StarRatingComponent rating={review?.reviewValue} />
                </div>
                <p className="text-muted-foreground">
                  {review?.reviewMessage}
                </p>
              </div>
            </div>
            ))):(<h1>No Reviews</h1>)}
              
            </div>
            <div className="mt-10 flex-col flex gap-2">
              <Label>Write a Review.....</Label>
              <div className="flex gap-0.5">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMessage"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review....."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
