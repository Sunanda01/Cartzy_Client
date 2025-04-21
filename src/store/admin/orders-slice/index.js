import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/axiosInstance";
const initialState = {
  AdminOrderList: [],
  adminOrderDetails: null,
  isLoading: false,
};

export const getAllOrder = createAsyncThunk(
  "/orders/get-all-order",
  async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/get-order`,
    );
    return response?.data;
  }
);

export const getOrderDetails = createAsyncThunk(
  "/orders/get-order-details",
  async (id) => {
    const response = await axiosInstance.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/admin/orders/get-order-details/${id}`,
    );
    return response?.data;
  }
);

export const updateOrderDetails = createAsyncThunk(
  "/orders/update",
  async ({ id, orderStatus }) => {
    const response = await axiosInstance.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/update/${id}`,
      { orderStatus },
    );
    return response?.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.adminOrderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.AdminOrderList = action?.payload.data;
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.isLoading = false;
        state.AdminOrderList = null;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminOrderDetails = action?.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.adminOrderDetails = null;
      });
  },
});
export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;
