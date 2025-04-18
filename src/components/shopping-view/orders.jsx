import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/order-slice/index";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
    setOpenDetailsDialog(true);
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  return (
    <>
    <Card className="lg:block hidden">
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => (
                  <TableRow key={orderItem?._id}>
                    <TableCell>{orderItem?._id}</TableCell>
                    <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>
                      <Badge
                        className={`py-1 px-3 ${
                          orderItem?.orderStatus === "confirmed"
                            ? "bg-green-500"
                            : orderItem?.orderStatus === "rejected"
                            ? "bg-red-600"
                            : "bg-black"
                        }`}
                      >
                        {orderItem?.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>${orderItem?.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button
                        onClick={() =>
                          handleFetchOrderDetails(orderItem?._id)
                        }
                        >
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>

    {/* Order Cards for mobile (≤640px) */}
    {orderList?.map((orderItem) => (
        <Card
          key={orderItem._id}
          className="block lg:hidden border p-4 rounded-lg shadow-sm bg-white space-y-2 m-2 min-w-[360px]"
        >
          <CardContent className="flex flex-col gap-2">
            <div>
              <strong>Order ID:</strong> {orderItem._id}
            </div>
            <div>
              <strong>Date:</strong> {orderItem.orderDate.split("T")[0]}
            </div>
            <div>
              <strong>Status:</strong>{" "}
              <Badge
                className={`py-1 px-3 ${
                  orderItem.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderItem.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderItem.orderStatus}
              </Badge>
            </div>
            <div>
              <strong>Total:</strong> ${orderItem.totalAmount.toFixed(2)}
            </div>
          </CardContent>
          <div className="flex items-center justify-center">
            <CardFooter>
              <Dialog
                open={openDetailsDialog}
                onOpenChange={() => {
                  setOpenDetailsDialog(false);
                  dispatch(resetOrderDetails());
                }}
              >
                <Button onClick={() => handleFetchOrderDetails(orderItem._id)}>
                  View Details
                </Button>
                <ShoppingOrderDetailsView orderDetails={orderDetails} />
              </Dialog>
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
}

export default ShoppingOrders;
