import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productsList: [],
};

export const fetchAllFeaturedProducts = createAsyncThunk(
  "/products/fetchFilteredProducts",
  async () => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/products/get`
    );
    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeaturedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFeaturedProducts.fulfilled, (state, action) => {
        (state.isLoading = false), (state.productsList = action?.payload.data);
      })
      .addCase(fetchAllFeaturedProducts.rejected, (state) => {
        (state.isLoading = false), (state.productsList = null);
      });
  },
});

export default shoppingProductSlice.reducer;
