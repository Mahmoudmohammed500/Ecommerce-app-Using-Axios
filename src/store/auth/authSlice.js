import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import actLogin from "./act/actLogin";
import actRegister from "./act/actRegister";
import actGetUser from "./act/actGetUser";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUIState: (state) => {
      state.actType = null;
      state.loading = false;
      state.error = null;
    },
    logout: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(actLogin.pending, (state) => {
      state.islogedin = false;
      state.loading = true;
      state.error = null;
      state.actType = "login";
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.islogedin = true;
      state.loading = false;
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      state.actType = null;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.islogedin = false;
      state.loading = false;
      state.error = action.payload ? action.payload : "Login is Failed";
      state.actType = "login";
    });
    //register
    builder.addCase(actRegister.pending, (state) => {
      state.islogedin = false;
      state.loading = true;
      state.error = null;
      state.actType = "register";
    });
    builder.addCase(actRegister.fulfilled, (state, action) => {
      state.islogedin = false;
      state.loading = false;
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      state.actType = null;
    });
    builder.addCase(actRegister.rejected, (state, action) => {
      state.islogedin = false;
      state.loading = false;
      state.error = action.payload;
      state.actType = "register";
    });
    //actGetUser
    builder.addCase(actGetUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.actType = "getusers";
    });
    builder.addCase(actGetUser.fulfilled, (state, action) => {
      state.islogedin = false;
      state.loading = false;
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      state.actType = null;
    });
    builder.addCase(actGetUser.rejected, (state, action) => {
      state.islogedin = false;
      state.loading = false;
      state.error = action.payload;
      state.actType = "getusers";
    });
  },
});

export { actLogin, actRegister, actGetUser };

export const { resetUIState, logout } = authSlice.actions;

export default authSlice.reducer;