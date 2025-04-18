import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/admin/orders-slice";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./order-details-view";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  const { AdminOrderList, adminOrderDetails } = useSelector(
    (state) => state.adminOrder
  );

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);

  useEffect(() => {
    if (adminOrderDetails !== null) setOpenDetailsDialog(true);
  }, [adminOrderDetails]);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }
  return (
    <>
      <Card className="hidden lg:block overflow-hidden min-w-[1024px]">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl ">Order History</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto ">
          <div className=" ">
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
                {AdminOrderList && AdminOrderList.length > 0
                  ? AdminOrderList.map((orderItem) => (
                      <TableRow key={orderItem._id}>
                        <TableCell>{orderItem?._id}</TableCell>
                        <TableCell>
                          {orderItem?.orderDate.split("T")[0]}
                        </TableCell>
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
                        <TableCell>
                          ${orderItem?.totalAmount.toFixed(2)}
                        </TableCell>
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
                            <AdminOrderDetailsView
                              adminOrderDetails={adminOrderDetails}
                            />
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="hidden sm:block lg:hidden space-y-4 m-2">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl ">Order History</CardTitle>
        </CardHeader>
      </Card>

      {AdminOrderList?.map((orderItem) => (
        <Card
          key={orderItem._id}
          className="hidden sm:flex lg:hidden flex-row border p-4 rounded-lg shadow-sm bg-white space-y-2 m-2 justify-between"
        >
          <CardContent className="flex flex-col gap-2 ">
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
          <CardFooter>
            <div>
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
                <AdminOrderDetailsView adminOrderDetails={adminOrderDetails} />
              </Dialog>
            </div>
          </CardFooter>
        </Card>
      ))}

      {/* Header for mobile */}
      <Card className="block sm:hidden space-y-4 m-2">
        <CardHeader>
          <CardTitle className="text-lg">Order History</CardTitle>
        </CardHeader>
      </Card>

      {/* Order Cards for mobile (≤640px) */}
      {AdminOrderList?.map((orderItem) => (
        <Card
          key={orderItem._id}
          className="block sm:hidden border p-4 rounded-lg shadow-sm bg-white space-y-2 m-2"
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
                <AdminOrderDetailsView adminOrderDetails={adminOrderDetails} />
              </Dialog>
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
}

export default AdminOrdersView;
