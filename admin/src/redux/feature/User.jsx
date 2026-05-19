import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import server from "../../env.js";


export const signup = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${server}/user/v1/register`,
        { name, email, password, },
        { withCredentials: true }
      );
      console.log(res.data)
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Signup failed" }
      );
    }
  }
);

/* ================= LOGIN ================= */
export const login = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${server}/user/v1/login`,
        { email, password },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const logoutUser=createAsyncThunk( "auth/logoutUser",async (_,thunkAPI)=>{
  try{
    let res=await axios.post(`${server}/user/v1/logout`,{},{ withCredentials: true})

     return res.data;
  }catch(err){
    return thunkAPI.rejectWithValue(
       err.response?.data || { message: "Logout failed" }
    )
  }
})




export const getUser = createAsyncThunk(
  "auth/getUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `${server}/user/v1/me`,
        
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Not authenticated" }
      );
    }
  }
);



const initialState = {
  user: null,
  loading: false,
  error: null,
  successMessage: "",
   authLoading: true, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(logoutUser.pending,(state)=>{
         state.loading = true;
        state.error = null;
      })
        .addCase(logoutUser.fulfilled,(state,action)=>{
         state.loading = false;
        state.user = null;
        state.successMessage = action.payload.message;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
       .addCase(getUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.authLoading = false;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state) => {
        state.authLoading = false;
        state.user = null;
      })

  },
});

export default authSlice.reducer;