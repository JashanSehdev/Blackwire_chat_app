import { User } from "@/type/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { googleAuthAsync, loginUserAsync, logoutMeAsync, registerUserAsync } from "./handle-auth/auth.action";
import { changeAvatarAsync } from "./handle-user/users.action";

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserAsync.fulfilled, (state, action:PayloadAction<User>) => {
      state.user = action.payload
    })
    .addCase(registerUserAsync.fulfilled, (state, action : PayloadAction<User>) => {
      state.user = action.payload
    })
    .addCase(logoutMeAsync.fulfilled, (state) => {
      state.user = null
    }) 
    .addCase(googleAuthAsync.fulfilled, (state, action) => {
      state.user = action.payload
    }) 
    .addCase(changeAvatarAsync.fulfilled, (state, action) => {
      if(!state.user) return;
      state.user.avatar = action.payload.data.avatar
    })



  }
});

export const {logoutUser} = authSlice.actions
export default authSlice.reducer
