import { DialogContent } from "@radix-ui/react-dialog";
import {useState} from "react";
import { Separator } from "../ui/separator";

const initialFormData={
    status:''
}

function AdminOrderDetailsView() {
    const [formData, setFormData] = useState(initialFormData);

    function handleUpdateStatus(e){
        e.preventDefault();
    }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>123456</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>123456</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              Order Details
               {/* {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}  */}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              {/* <span>{user.userName}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>  */}
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
