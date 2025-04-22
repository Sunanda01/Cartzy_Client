import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
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
    let getCartItem = cartItems?.items || [];
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
        toast.success(data?.payload?.msg);
      } else {
        toast.info(data?.payload?.msg || "An unexpected error occurred.");
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
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="lg:grid lg:grid-cols-2 gap-8 sm:p-6 md:p-8 lg:p-12 max-w-[95vw] sm:max-w-[90vw] lg:max-w-[70vw] flex flex-col p-4 overflow-y-auto max-h-[90vh]">
        <div className="relative rounded-lg overflow-hidden w-full">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between w-full">
          <div>
            <h1 className="font-extrabold text-2xl md:text-3xl">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-base md:text-lg mt-2 mb-4 text-justify">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : null
              } text-base md:text-lg font-semibold text-primary`}
            >
              ₹{productDetails?.price}
            </span>
            {productDetails?.salePrice > 0 ? (
              <span className="text-base md:text-lg font-bold text-muted-foreground">
                ₹{productDetails?.salePrice}
              </span>
            ) : null}
          </div>
          <div className="flex gap-2 mt-2 items-center mb-4">
            {/* <div className="flex items-center gap-0.5"> */}
              <StarRatingComponent rating={averageReview} />
            {/* </div> */}
            <span className="text-muted-foreground text-sm">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className="mb-4">
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
          <div className="max-h-[250px] overflow-auto mb-6">
            <h2 className="font-bold text-xl mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="flex gap-4" key={review?._id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {" "}
                        {review?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{review?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={review?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {review?.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-sm text-muted-foreground">No Reviews</h1>
              )}
            </div>
            <div className="mt-4 flex-col flex gap-2">
              <Label>Write a Review.....</Label>
              <div className="flex gap-1">
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
