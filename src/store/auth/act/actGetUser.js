import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetUser = createAsyncThunk(
  "auth/actgetUser",
  async (_, thunkAPI) => {
    const { rejectWithValue  , signal } = thunkAPI;

    try {
      const res = await axios.get("/register", { signal });
      const data = res.data; // Extract the data from the response
     
    return data; // Return only the necessary data in the action payload
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

export default actGetUser;