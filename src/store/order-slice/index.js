import axiosInstance from "@/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  paymentId: null,
  orderDetails: null,
  orderList: [],
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/orders/create`,
      orderData
    );
    return response?.data;
  }
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/orders/capture`,
      { paymentId, payerId, orderId }
    );
    return response?.data;
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/orders/list/${userId}`
    );

    return response.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/orders/details/${id}`
    );

    return response.data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: { resetOrderDetails: (state) => (state.orderDetails = null) },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        (state.approvalURL = action?.payload.approvalURL),
          (state.isLoading = false),
          (state.orderId = action?.payload?.orderId),
          (state.paymentId = action?.payload?.paymentId),
          sessionStorage.setItem(
            "currentOrderId",
            JSON.stringify(action?.payload?.orderId)
          );
        sessionStorage.setItem(
          "currentPaymentId",
          JSON.stringify(action?.payload?.paymentId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        (state.approvalURL = null),
          (state.isLoading = false),
          (state.orderId = null);
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action?.payload.data;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action?.payload?.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  },
});
export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
