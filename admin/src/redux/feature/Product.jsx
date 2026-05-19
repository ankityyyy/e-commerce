import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env.js";

 
export const createProduct = createAsyncThunk(
  "product/create",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${server}/product/v1`, data,
        {withCredentials: true},
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Product add failed" }
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const res = await axios.delete(`${server}/product/v1/${id}`,
        {withCredentials: true},
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Product delete failed" }
      );
    }
  }
);


export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${server}/product/v1`,
        {withCredentials: true},
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Product fetch failed" }
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.product) {
          state.product.push(action.payload.product);
        }

        state.successMessage = action.payload.message;
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
         state.product= action.payload.product || [];

        state.successMessage = action.payload.message;
      })

      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

     
        state.product = state.product.filter(
          (item) => item._id !== action.meta.arg
        );

        state.successMessage = action.payload.message;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export default productSlice.reducer;