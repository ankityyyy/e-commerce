import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env.js";

export const getProductai = createAsyncThunk(
  "productai/getProductai",

  async (query, thunkAPI) => {

    try {

      const res = await axios.post(
        `${server}/api/v1/ai/query`,
        { query },
        {
          withCredentials: true,
        }
      );

      return res.data;

    } catch (err) {

      return thunkAPI.rejectWithValue(
        err.response?.data || {
          message: "Product fetch failed",
        }
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  products: [],
  aiMessage:""
};

const searchSlice = createSlice({
  name: "search",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(getProductai.pending, (state) => {

        state.loading = true;

        state.error = null;
      })

      .addCase(getProductai.fulfilled, (state, action) => {

        state.loading = false;

        // CHECK CONSOLE RESPONSE
        state.products = action.payload.products || [];
        state.aiMessage=action.payload.answer
      })

      .addCase(getProductai.rejected, (state, action) => {

        state.loading = false;

        state.error =
          action.payload?.message || "Something went wrong";
      });
  },
});

export default  searchSlice.reducer;