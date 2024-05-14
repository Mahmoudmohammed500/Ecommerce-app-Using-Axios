import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import { cartTotalQuantity, totalPrice, itemQuantityById } from "./selectors";

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    closeReachToMax(state) {
      state.reachToMax = false;
    },
    changeQuantity(state, action) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
    },
    addToCart(state, action) {
      const id = action.payload.id;
      const max = action.payload.max;
      if (max && state.items[id] === max) {
        state.reachToMax = true;
      } else {
        if (state.reachToMax) {
          state.reachToMax = false;
        }

        if (state.items[id]) {
          state.items = {
            ...state.items,
            [id]: state.items[id] + 1,
          };
        } else {
          state.items = {
            ...state.items,
            [id]: 1,
          };
        }
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = Object.keys(state.items)
        .filter(itemId => itemId !== id)
        .reduce((result, itemId) => {
          result[itemId] = state.items[itemId];
          return result;
        }, {});
    },
  },
});

export const { closeReachToMax, addToCart, changeQuantity, removeItem } =
  cartSlice.actions;
export { cartTotalQuantity, totalPrice, itemQuantityById };
export default cartSlice.reducer;
