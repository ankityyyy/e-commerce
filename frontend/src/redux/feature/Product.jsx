import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env.js";

 

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${server}/product/v1`, {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Product fetch failed" }
      );
    }
  }
);


// ✅ GET PRODUCT BY ID 
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`${server}/product/v1/${id}`, {
        withCredentials: true,
      });

      return res.data; // ✅ no fulfillWithValue
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);


const initialState = {
  loading: false,
  error: null,
  successMessage: "",
  products: [],        // ✅ list
  singleProduct: null, // ✅ one product
};


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ✅ GET ALL
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.product || [];
      })

      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      })


      // ✅ GET BY ID
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload.product; // ✅ correct key
      })

      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
      });
  },
});

export default productSlice.reducer;