import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllData = createAsyncThunk("getProducts", async () => {
  const res = await axios.get('https://fakestoreapi.com/products')
  const result = res.data;
  return result;
})

const initialState = {
  cart: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalQuantity = state.items.length;
        state.totalPrice = 0;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.items = []
        state.totalQuantity = 0;
        state.totalPrice = 0;
      });
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
