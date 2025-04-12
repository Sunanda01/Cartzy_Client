import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/add`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response?.data;
  }
);

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/get/${userId}`
  );
  return response?.data;
});

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      }
    );
    return response.data;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/cart/${userId}/${productId}`
    );
    return response.data;
  }
);

const shoppingCartSlice = createSlice({
  name: "ShoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // console.log(action?.payload,'addToCart');
        (state.isLoading = false), (state.cartItems = action?.payload?.data);
      })
      .addCase(addToCart.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = null);
      })
      .addCase(fetchCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        console.log(action?.payload, "fetchCart");
        (state.isLoading = false), (state.cartItems = action?.payload?.data);
      })
      .addCase(fetchCart.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = null);
      })
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        console.log(action?.payload, "updateCart");
        (state.isLoading = false), (state.cartItems = action?.payload?.data);
      })
      .addCase(updateCart.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = null);
      })
      .addCase(deleteCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        console.log(action?.payload, "deleteCart");
        (state.isLoading = false), (state.cartItems = action?.payload?.data);
      })
      .addCase(deleteCart.rejected, (state) => {
        (state.isLoading = false), (state.cartItems = null);
      });
  },
});
export default shoppingCartSlice.reducer;
