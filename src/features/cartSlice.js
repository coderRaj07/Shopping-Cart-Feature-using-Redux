import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllData = createAsyncThunk("getProducts", async () => {
  const res = await axios.get('https://fakestoreapi.com/products')
  const result = res.data;
  // Adding the quantity field to each item in the result
  // const itemsWithQuantity = result.map(item => ({ ...item, quantity: 0 }));
  // return itemsWithQuantity;
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
      //find index  of the element whose id = id of element entered
      let find = state.cart.findIndex((item)=>item.id === action.payload.id)
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } 
      else {

      //The followiing logic won't work
        // action.payload.quantity = 1;
        // state.cart.push(action.payload);
      //Since the API response objects are not extensible by default, meaning you cannot add new properties directly to them.

      // Adding the quantity field to the new item being added to the cart
        const newItem = { ...action.payload, quantity: 1 };
        state.cart.push(newItem);
      }
    },

    
    getCartTotal: (state) => {

      let {totalQuantity, totalPrice} =          // from cartTotal object totalQuantity and totalPrice is selected 
      state.cart.reduce(                         // will iterate through each cart element
        (cartTotal,cartItem)=>{
          const {price,quantity} = cartItem;     // takes price and quantity of each element (item) 
          const itemTotal = price * quantity;    // gets total item price or element price
          cartTotal.totalPrice += itemTotal;     // cartTotal object's totalPrice gets updated 
          cartTotal.totalQuantity += quantity;   // cartTotal object's totalQuantity gets updated  
          return cartTotal},                     // cartTotal object is returned 
          //initial values declared
          {
            totalPrice:0,
            totalQuantity:0
          }                     
      )

      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;   
    },


    removeItem: (state,action) =>{
      //use filter to show only elements of state.cart such that it doesn't show what is requested to remove
      state.cart = state.cart.filter((item)=>item.id!==action.payload)
    },

    increaseItemQuantity: (state,action) =>{
      // since state.cart is an array and each array element has the property quantity and price
      // So to make the followiing logic work, we have to make changes in each element of cart array
      // i.e, to loop over the entire array and make changes as reqd.
            //  state.cart.quantity+=1;
            //  state.cart.price += state.cart.price
      // We can use map method
      state.cart = state.cart.map((item)=>{
        if(item.id===action.payload) {        //in action.payload we are taking the id from the component page itself
          return {...item,
            quantity: item.quantity+1,
            price: item.price * (item.quantity + 1) }        
        }
        return item;
      })
    },

    decreaseItemQuantity: (state,action) =>{
      state.cart = state.cart.map((item)=>{
        if(item.id===action.payload) {        //in action.payload we are taking the id from the component page itself
          return {...item,
            quantity: item.quantity-1,
            price: item.price * (item.quantity - 1) }        
        }
        return item; 
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalQuantity = 0;
        state.totalPrice = 0;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.items = []
        state.totalQuantity = 0;
        state.totalPrice = 0;
      });
  },
});

export const { addToCart,getCartTotal,removeItem, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
