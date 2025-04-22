import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useState } from "react";
import {
  getAllOrder,
  getOrderDetails,
  updateOrderDetails,
} from "@/store/admin/orders-slice";
import { toast } from "sonner";
const initialFormData = {
  status: "",
};

function AdminOrderDetailsView({ adminOrderDetails }) {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  function handleUpdateStatus(e) {
    e.preventDefault();
    const { status } = formData;
    dispatch(
      updateOrderDetails({ id: adminOrderDetails?._id, orderStatus: status })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getOrderDetails(adminOrderDetails?._id));
        dispatch(getAllOrder());
        setFormData(initialFormData);
        toast.success(data?.payload?.msg);
      }
    });
  }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{adminOrderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{adminOrderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>
              ₹{adminOrderDetails?.totalAmount * (83.25).toFixed(2)}
            </Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{adminOrderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{adminOrderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ₹{
                  adminOrderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : adminOrderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {adminOrderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {adminOrderDetails?.cartItems &&
              adminOrderDetails?.cartItems.length > 0
                ? adminOrderDetails?.cartItems.map((item) => (
                    <li
                      key={item._id || item.productId}
                      className="flex items-center justify-between"
                    >
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ₹{item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{adminOrderDetails?.addressInfo?.address}</span>
              <span>{adminOrderDetails?.addressInfo?.city}</span>
              <span>{adminOrderDetails?.addressInfo?.pincode}</span>
              <span>{adminOrderDetails?.addressInfo?.phone}</span>
              <span>{adminOrderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;
