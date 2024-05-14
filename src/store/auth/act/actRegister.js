import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actRegister = createAsyncThunk(
  "auth/actRegister",
  async (userInfo, thunkAPI) => {
    const { email, password, firstName, lastName } = userInfo;
    const registeredEmails = JSON.parse(localStorage.getItem("registeredEmails")) || [];
    const registeredPasswords = JSON.parse(localStorage.getItem("registeredPasswords")) || [];
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post("/register", {
        email,
        password,
        firstName,
        lastName,
      });
        // Add a new Registered Email and Password to the existing values on LocalStorage
        const newEmail = email;
        registeredEmails.push(newEmail);
        const newPassword = password;
        registeredPasswords.push(newPassword);
        // Store the updated values back into localStorage
        localStorage.setItem("registeredEmails", JSON.stringify(registeredEmails));
        localStorage.setItem("registeredPasswords", JSON.stringify(registeredPasswords));
        /////////////////////////////////////////////////////////////
      // delete res.data.user.id; this statement make actRegister() get the rejected phase 
      return res.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return rejectWithValue("Error from network");
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export default actRegister;