import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productsList: [],
  productDetails: null,
};

export const fetchAllFeaturedProducts = createAsyncThunk(
  "/products/fetchFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/products/get?${query}`
    );
    return result?.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchproductDetails",
  async (id) => {
    const result = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/shop/products/get/${id}`
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
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log(action?.payload.data,'details');
        (state.isLoading = false),
        (state.productDetails = action?.payload.data);
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        (state.isLoading = false), (state.productDetails = null);
      });
  },
});

export default shoppingProductSlice.reducer;
