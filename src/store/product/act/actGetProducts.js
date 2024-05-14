import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actGetProducts = createAsyncThunk(
  "products/actGetProducts",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const { data } = await axios.get("/products", { signal });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default actGetProducts; 