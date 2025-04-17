import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  addressList: [],
};
import { addressSchema } from "@/validators";
import { toast } from "sonner";
import api from "@/api";

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData, { rejectWithValue }) => {
    const result = addressSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        if (!formattedErrors[field]) {
          formattedErrors[field] = [];
        }
        formattedErrors[field].push(err.message);
      });

      return rejectWithValue({
        success: false,
        msg: "Validation failed",
        errors: formattedErrors,
      });
    }
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop/address/add`,
        result.data
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        success: false,
        msg: err?.response?.data?.msg || "Failed to add address",
      });
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await api.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/address/get/${userId}`
    );

    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    const result = addressSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        if (!formattedErrors[field]) {
          formattedErrors[field] = [];
        }
        formattedErrors[field].push(err.message);
      });
      return rejectWithValue({
        success: false,
        msg: "Validation failed",
        errors: formattedErrors,
      });
    }
    try {
      const response = await api.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/shop/address/update/${userId}/${addressId}`,
        result.data // validated + possibly coerced input
      );
      return response.data;
    } catch (err) {
      return rejectWithValue({
        success: false,
        msg: err?.response?.data?.msg || "Failed to update address",
      });
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await api.delete(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/shop/address/delete/${userId}/${addressId}`
    );

    return response.data;
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        const payload = action.payload;

        if (payload?.errors) {
          Object.entries(payload.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => {
                toast.error(`${field}: ${msg}`);
              });
            }
          });
        } else {
          toast.error(payload?.msg || "Something went wrong");
        }
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(editAddress.rejected, (state, action) => {
        const payload = action.payload;
        if (payload?.errors) {
          Object.entries(payload.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => {
                toast.error(`${field}: ${msg}`);
              });
            }
          });
        } else {
          toast.error(payload?.msg || "Something went wrong");
        }
      });
  },
});
export default addressSlice.reducer;
