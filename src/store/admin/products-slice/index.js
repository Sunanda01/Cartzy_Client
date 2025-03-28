import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/add`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchallproduct",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/get`
    );
    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/delete/${id}`
    );
    return response?.data;
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addNewProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(addNewProduct.fulfilled,(state,action)=>{
        console.log(action.payload);
        (state.isLoading=false);
        (state.productList=action.payload.data);
    })
    .addCase(addNewProduct.rejected,(state)=>{
        (state.isLoading=false),
        (state.productList=[]);
    })
    .addCase(fetchAllProduct.pending,(state)=>{
      state.isLoading=true;
    })
    .addCase(fetchAllProduct.fulfilled,(state,action)=>{
      console.log(action.payload.data);
      state.isLoading=false;
      state.productList=action.payload.data;
    })
    .addCase(fetchAllProduct.rejected,(state)=>{
      state.isLoading=false;
      state.productList=[];
    });
  },
});

export default AdminProductSlice.reducer; 