import {configureStore} from '@reduxjs/toolkit';
import authSlice from "../feature/User.jsx"
import productSlice from "../feature/Product.jsx"
import orderSlice from "../feature/Order.jsx"
 
const Store = configureStore({
  reducer: {
    auth:authSlice, 
    product:productSlice ,
    order:orderSlice,
    
  }
});

export default Store; 