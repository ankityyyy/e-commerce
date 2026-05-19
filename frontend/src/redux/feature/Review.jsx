import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env.js";


// ✅ ADD REVIEW
export const addReview = createAsyncThunk(
  "review/addReview",
  async ({ id, reviewData }, thunkAPI) => {
    console.log("data come ",id)
    try {
      const res = await axios.post(
        `${server}/review/v1/${id}`,
        reviewData,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Add review failed" }
      );
    }
  }
);



export const getReviewId = createAsyncThunk(
  "review/getReviewId",
  async (id, thunkAPI) => {
    console.log("review data fetch:", id);

    try {
      const res = await axios.get(
        `${server}/review/v1/${id}`,
        { withCredentials: true }
      );

      console.log("review data", res.data);
      return res.data;
    } catch (err) {
      console.log("ERROR:", err);
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Fetch review failed" }
      );
    }
  }
);


// ✅ DELETE REVIEW
export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async ({ productId, reviewId }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `${server}/api/v1/product/${productId}/review/${reviewId}`,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Delete review failed" }
      );
    }
  }
);


const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: false,
    error: null,
    success: false,
    reviews: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ADD REVIEW
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
         state.reviews.unshift(action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getReviewId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReviewId.fulfilled, (state,action) => {
        state.loading = false;
        state.success = true;
         state.reviews = action.payload.data;
      })
      .addCase(getReviewId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // DELETE REVIEW
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default reviewSlice.reducer;