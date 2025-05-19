import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart(state, action) {
      const cartData = action.payload;
      state.cart = cartData;
    },
    addToCart(state, action) {
      const newCartItem = action.payload;
      state.cart = [...state.cart, newCartItem];
    },
    removeCart: (state, action) => {
      const cartDeleteId = action.payload;
      const newCart = state.cart.filter((item) => item.id !== cartDeleteId);
      state.cart = newCart;
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeCart, updateCart, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
