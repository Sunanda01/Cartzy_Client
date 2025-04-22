import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) {
  return (
    <>
    <Card className="w-full min-w-[200px] max-w-sm mx-auto flex flex-col h-full"> 
      <div
        className="relative cursor-pointer"
        onClick={() => handleGetProductDetails(product?._id)}
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[250px] object-cover rounded-t-lg"
        />
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 rounded-full bg-red-500 hover:bg-red-600">
            Out of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 rounded-full bg-red-500 hover:bg-red-600">
            Only {product?.totalStock} items left
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 rounded-full bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        ) : null}
      </div>

      <CardContent className="flex-1 flex flex-col justify-between p-4 ">
        <div className="mb-4">
          <h2 className="text-xl font-bold line-clamp-2">{product?.title}</h2>
          <div className="flex justify-between items-center mt-1 text-sm text-muted-foreground">
            <span>{product?.category}</span>
            <span>{product?.brand}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : null
            } text-lg font-semibold text-primary`}
          >
            ₹{product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-bold">₹{product?.salePrice}</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
          >
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
    </>
  );
}

export default ShoppingProductTile;
