import {configureStore} from '@reduxjs/toolkit';
import authSlice from "../feature/User.jsx"
import productSlice from "../feature/Product.jsx"
import reviewSlice from "../feature/Review.jsx"
import cartSlice from "../feature/Cart.jsx"
import  searchSlice from "../feature/Seacrh";

const Store = configureStore({
  reducer: {
    auth:authSlice, 
     product:productSlice,
     review:reviewSlice,
     cart:cartSlice,
     search:searchSlice,
    
  }
});

export default Store; 