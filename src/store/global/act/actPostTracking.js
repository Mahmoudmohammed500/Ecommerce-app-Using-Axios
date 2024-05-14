import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actPostTracking = createAsyncThunk(
  "global/actPostTracking",
  async (error) => {
    try {
      await axios.post("https://json-server-for-ecommerce-app-using-axios.onrender.com/tracking", {
        message: error.message,
        endPoint: error.config.url,
      });
    } catch (error) {}
  }
);
