import { createSlice } from "@reduxjs/toolkit";

const initialState  = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      // check if item is already exiests
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );

      // incresing item count
      if (existingItem) {
        existingItem.quantity + 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      // filter return a new arry so storing it an same array
      state.cartItems = state.cartItems.filter(
        (item) => item.id === action.payload,
      );
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);

      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);

      // Check item and item quantity is more than one
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addtoCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;

export default cartSlice.reducer;
