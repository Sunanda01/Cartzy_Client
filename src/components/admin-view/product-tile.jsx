import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

function AdminProductTile({
  setCurrentEditedId,
  setOpenCreateProductsDialog,
  setFormData,
  product,
  handleDelete,
}) {
  return (
    <Card className="w-full min-w-[200px] max-w-sm mx-auto flex flex-col h-full">
      <div className="relative ">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[250px] object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="flex-1 flex flex-col justify-between p-4 ">
        <div className="mb-4">
          <h2 className="text-xl font-bold line-clamp-2">{product?.title}</h2>
          <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
            <span>{product?.category}</span>
            <span>{product?.brand}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-primary`}
          >
            ₹{product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-bold">₹{product?.salePrice}</span>
          ) : (
            ""
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-3">
        <Button
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            handleDelete(product._id);
          }}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AdminProductTile;
