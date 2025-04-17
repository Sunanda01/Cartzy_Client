import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/api";
import { registerSchema, logInSchema } from "@/validators";
import { toast } from "sonner";
const userFromStorage = localStorage.getItem("cartzy_userInfo")
  ? JSON.parse(localStorage.getItem("cartzy_userInfo"))
  : null;
const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: userFromStorage,
  error: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return rejectWithValue({ msg: "Validation Error", errors });
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        formData
      );
      if (response?.data?.success) {
        localStorage.setItem(
          "cartzy_userInfo",
          JSON.stringify(response?.data?.data)
        );
        localStorage.setItem("cartzy_token", response?.data?.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue({
        msg: error.response?.data?.msg || "Something went wrong",
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    const result = logInSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return rejectWithValue({ msg: "Validation Error", errors });
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData
      );
      if (response?.data?.success) {
        localStorage.setItem(
          "cartzy_userInfo",
          JSON.stringify(response?.data?.data)
        );
        localStorage.setItem("cartzy_token", response?.data?.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue({
        msg: error.response?.data?.msg || "Login failed",
      });
    }
  }
);

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  const response = await api.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
    {}
  );
  if (response?.data?.success) {
    localStorage.removeItem(
      "cartzy_userInfo",
      JSON.stringify(response?.data?.data)
    );
    localStorage.removeItem("cartzy_token", response?.data?.token);
  }
  return response.data;
});

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await api.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/check-auth`,
    {
      headers: {
        "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.data),
          (state.isAuthenticated = true);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;

        const payload = action.payload;

        if (payload?.errors) {
          Object.values(payload.errors).forEach((fieldErrors) => {
            if (fieldErrors?.[0]) toast.error(fieldErrors[0]);
          });
        } else {
          toast.error(payload?.msg || "Something went wrong");
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.data),
          (state.isAuthenticated = true);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthenticated = false);
        const payload = action.payload;
        if (payload?.errors) {
          Object.values(payload.errors).forEach((fieldErrors) => {
            if (fieldErrors?.[0]) toast.error(fieldErrors[0]);
          });
        } else {
          toast.error(payload?.msg || "Something went wrong");
        }
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
