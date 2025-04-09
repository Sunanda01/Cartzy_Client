import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
import { getAllOrder, getOrderDetails, resetOrderDetails } from "@/store/admin/orders-slice";
import { Badge } from "../ui/badge";
import AdminOrderDetailsView from "./order-details-view";


function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();

  const { AdminOrderList,adminOrderDetails } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch]);
  
  useEffect(() => {
    if (adminOrderDetails !== null) setOpenDetailsDialog(true);
  }, [adminOrderDetails]);

  function handleFetchOrderDetails(getId){
    console.log(getId)
    dispatch(getOrderDetails(getId));
  }
  console.log(AdminOrderList,adminOrderDetails,'AdminOrders')
  return (
    <Card>
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
            {AdminOrderList && AdminOrderList.length > 0
              ? AdminOrderList.map((orderItem) => (
                  <TableRow>
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
                    <TableCell>${orderItem?.totalAmount}</TableCell>
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
                        <AdminOrderDetailsView adminOrderDetails={adminOrderDetails} />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
