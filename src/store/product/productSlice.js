import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import actFilterProducts from "./act/actFilterProducts";
import actGetProducts from "./act/actGetProducts";

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Products
    builder.addCase(actGetProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actGetProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload;
    });
    builder.addCase(actGetProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    //filter by category
    builder.addCase(actFilterProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(actFilterProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.records = action.payload;
    });
    builder.addCase(actFilterProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export { actFilterProducts, actGetProducts };
export default productSlice.reducer;
