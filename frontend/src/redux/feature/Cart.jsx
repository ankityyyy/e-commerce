import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env";

export const addProductToCart = createAsyncThunk(
  "cart/productAddtocart",
  async ({ id, qty }, thunkAPI) => {
    console.log("data send")
    try {
      let response = await axios.post(`${server}/cart/v1/${id}`, {  quantity: qty },{withCredentials: true,}
      );
      console.log(response.data)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const getAllCartProduct = createAsyncThunk(
  "cart/getAllCartProduct",
  async (_, thunkAPI) => {
    try {
      let response = await axios.get(`${server}/cart/v1`,{withCredentials: true,});
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "cart/deleteProductFromCart",
  async (id, thunkAPI) => {
    try {
      let response = await axios.delete(`${server}/cart/v1/${id}`,{withCredentials: true,});
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (orderData, thunkAPI) => {
    try {
      console.log("SENDING:", orderData); // debug

      const response = await axios.post(
        `${server}/order/v1`,
        orderData, // ✅ NOT wrapped
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // ✅ important
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Order failed" }
      );
    }
  }
);

export const getAllPlaceOrder = createAsyncThunk(
  "order/getAllPlaceOrder",
  async (_, thunkAPI) => {
    console.log("getAllPlaceOrder call")
    try {
      let response = await axios.get(`${server}/order/v1`, {
          withCredentials: true,});
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);


const initialState = {
  item: [],
  orders:[],
  loading: false,
  cartFetched: false,
  error: false,
   success: false,
  message: "",
};

console.log()

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "Fetching products...";
      })
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.item = action.payload.cart;
        state.message = action.payload.message;
      })
      .addCase(addProductToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch products";
      })
      .addCase(getAllCartProduct.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.message = "Fetching cartProducts...";
      })
      .addCase(getAllCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.item = action.payload.item;
        state.message = action.payload.message;
      })
      .addCase(getAllCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch products";
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
       .addCase(getAllPlaceOrder.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.message = "Fetching order...";
      })
      .addCase(getAllPlaceOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.orders = action.payload.order;
        state.message = action.payload.message;
      })
       .addCase(getAllPlaceOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch order";
      })
      .addCase(deleteProductFromCart.pending,(state)=>{
        state.loading = true;
        state.error = false;
        state.message = "Fetching order...";
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.item=action.payload.data
        state.message = action.payload.message;
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload?.message || "Failed to fetch order";
  })
  },
});

export default cartSlice.reducer;
