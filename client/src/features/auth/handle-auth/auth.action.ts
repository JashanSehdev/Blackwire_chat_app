import { createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import { api, getErrorMessage } from "@/api/api";
import { LoginInput } from "@/app/login/login.type";
import { RegisterInput } from "@/app/register/register.type";
import { User } from "@/type/user.type";
import { GoogleDispatch } from "./auth.type";
import { enqueueSnackbar } from "notistack";
import { RootState } from "@/features/store";

type Register = Omit<RegisterInput, "confirmPassword">;

export const registerUserAsync = createAsyncThunk<User, Register>(
  "auth/register",
  async (user, thunkApi) => {
    try {
      await api.post("/auth/register", user);
      const result = await thunkApi.dispatch(getMeAsync()).unwrap();
      return result;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const loginUserAsync = createAsyncThunk<User, LoginInput>(
  "auth/login",
  async (user: LoginInput, thunkApi) => {
    try {
      await api.post("/auth/login", user);
      const result = await thunkApi.dispatch(getMeAsync()).unwrap();
      return result;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const getMeAsync = createAsyncThunk("auth/me", async (_, thunkApi) => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error: unknown) {
    return thunkApi.rejectWithValue(getErrorMessage(error));
  }
});

export const googleAuthAsync = createAsyncThunk(
  "auth/google",
  async (data: GoogleDispatch, thunkApi) => {
    try {
      await api.post("/auth/google", data);
      const result = await thunkApi.dispatch(getMeAsync()).unwrap();
      return result;
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);

export const logoutMeAsync = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await api.get("/auth/logout");
    } catch (error: unknown) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  },
);
