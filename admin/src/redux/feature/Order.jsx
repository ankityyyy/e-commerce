import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env.js";


export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${server}/order/v1/admin`,
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



export const changeOrderStatus = createAsyncThunk(
  "order/changeStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      console.log("changeOrderStatus send id")
      const res = await axios.patch(
        `${server}/order/v1/admin/${id}/status`,
        { status },
        { withCredentials: true }
      );

       return res.data.order; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Status update failed"
      );
    }
  }
);



const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
  },


  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orde;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.loading = false;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
      state.orders= action.payload.order;

   
  });
  },
});

export default orderSlice.reducer;