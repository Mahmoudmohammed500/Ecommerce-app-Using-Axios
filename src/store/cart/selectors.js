import { createSelector } from "@reduxjs/toolkit";

export const cartTotalQuantity = createSelector(
  (state) => state.cart.items,
  (items) => {
    let totalQuantity = 0;

    for (const id in items) {
      totalQuantity += items[id];
    }
    return totalQuantity;
  }
);

export const totalPrice = createSelector(
  (state) => state.cart.items,
  (_, records) => records,
  (items, records) => {
    let CartTotalPrice = 0;
    let Parsed_Record_Price = 0;
    for (const record of records) {
      Parsed_Record_Price = parseFloat(record.price);
      if (Parsed_Record_Price && items[record.id]) {
        CartTotalPrice += Parsed_Record_Price * items[record.id];
      }
    }
    return CartTotalPrice.toFixed(2);
  }
);

export const itemQuantityById = createSelector(
  (state) => state.cart.items,
  (_, id) => id,
  (items, id) => {
    return items[id];
  }
);
