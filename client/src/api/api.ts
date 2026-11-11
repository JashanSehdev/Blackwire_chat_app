import axios from "axios";
import { logoutMeAsync } from "@/features/auth/handle-auth/auth.action";
export const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const isUnauthorized = error.response?.status === 401;
    const isLogoutRequest = error.config?.url?.includes("/auth/logout");
    if (isUnauthorized && !isLogoutRequest) {
      const { store } = await import("@/features/store");
      store.dispatch(logoutMeAsync());
    }
    return Promise.reject(error);
  },
);

export const getErrorMessage = (error: unknown): string => {
  console.log("get error message called");
  if (typeof error === "string") {
    console.log("type of error, ", typeof error);
    return error;
  }

  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    console.log("message : ", message);
    if (typeof message === "string") {
      return message;
    }

    if (typeof message.message === "string") {
      return message;
    }
  }

  return "Something went wrong. Please try again.";
};
