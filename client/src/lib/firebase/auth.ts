import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import { api } from "@/api/api";
import { enqueueSnackbar } from "notistack";

export async function signInWithEmail(email: string, password: string) {
  const result = await signInWithEmailAndPassword(auth, email, password);

  console.log("Google result", result);
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Google register result", result);
  } catch (error) {
    console.error("Error While Signin", error);
  }
}

export const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    if(!result.user.displayName || !result.user.email) {
      throw new Error('User Data not found')
    }
    return {username : result.user.displayName, email : result.user.email, googleId : result.user.uid}

  } catch (error: any) {
    console.error(error);
    enqueueSnackbar({
      message: error?.message || "something went wrong",
      variant: "error",
    });
  }
};

export async function sendCredentials( data :{email :string, username :string}) {
  try {
    const response = await api.post("/auth/google", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
