import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice" // This contains cartSlice.reducer
export const store = configureStore({
  reducer: {
    allCart: cartReducer,
    
  },
});