import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {productSchema,updateProductSchema} from '@/validators';
import { toast } from "sonner";
const initialState = {
  isLoading: false,
  productList: [],
};


export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData, { rejectWithValue }) => {
    const result = productSchema.safeParse(formData);
    if (!result.success) {
      const flattenedErrors = result.error.flatten().fieldErrors;
      return rejectWithValue({
        success: false,
        msg: "Validation failed",
        errors: flattenedErrors,
      });
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/add`,
        result.data, // use validated + coerced data
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response?.data;
    } catch (err) {
      return rejectWithValue({
        success: false,
        msg: err?.response?.data?.msg || "Failed to add product",
      });
    }
  }
);


export const fetchAllProduct = createAsyncThunk(
  "/products/fetchallproduct",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/get`,
    );
    return response?.data;
  }
);


export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const parsed = updateProductSchema.safeParse(formData);
      if (!parsed.success) {
        const formattedErrors = {};
        parsed.error.errors.forEach((err) => {
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
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ msg: "Something went wrong" });
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/delete/${id}`,
      
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
      .addCase(addNewProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        (state.isLoading = false), (state.productList = []);
        const payload = action.payload;

        if (payload?.errors) {
          Object.values(payload.errors).forEach((fieldErrors) => {
            if (fieldErrors?.[0]) toast.error(fieldErrors[0]);
          });
        } else {
          toast.error(payload?.msg || "Something went wrong");
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
        const payload = action.payload;
        console.log("Validation Errors:", payload);
        if (payload?.errors) {
          Object.entries(payload.errors).forEach(([field, messages]) => {
            messages.forEach((msg) => {
              toast.error(`${field}: ${msg}`);
            });
          });
        } else if (payload?.msg) {
          toast.error(payload.msg);
        } else {
          toast.error("Something went wrong");
        }
      })      
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllProduct.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminProductSlice.reducer;
