import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { enqueueSnackbar } from "notistack";

const createSession = async (idToken: string) => {
  const res = await fetch("/api/session", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create session");
  }
};

export const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    await createSession(idToken);

    enqueueSnackbar({ message: "login success", variant: "success" });
  } catch (error: any) {
    console.error(error);
    enqueueSnackbar({
      message: error?.message || "something went wrong",
      variant: "error",
    });
  } finally {
  }
};

export const handleEmailLogin = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await result.user.getIdToken();
    await createSession(idToken);
    enqueueSnackbar({ message: "login success", variant: "success" });
  } catch (error: any) {
    console.error(error);
    let message = "Login failed";
    if (error.code === "auth/user-not-found") {
      message = "User not found";
    } else if (error.code === "auth/wrong-password") {
      message = "wrong password";
    } else if (error.code === "auth/invalid-email") {
      message = "invalid email format";
    }

    enqueueSnackbar({message : message,  variant: error });
  }
};
