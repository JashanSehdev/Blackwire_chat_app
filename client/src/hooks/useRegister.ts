'use client'

import { getErrorMessage } from "@/api/api";
import { registerUserAsync } from "@/features/auth/handle-auth/auth.action";
import { useAppDispatch } from "@/features/store";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useState } from "react"

export default function useRegister () {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch  = useAppDispatch()
    const router = useRouter()
    
    async function registerUser(username : string, email : string, password : string) {
        try {
            setLoading(true);
            await dispatch(registerUserAsync({username, email, password})).unwrap()
            enqueueSnackbar("Registration Successful", {variant: 'success'})
            router.replace("/")
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error), {variant: 'error'})
        } finally {
            setLoading(false)
        } 
    }


    return  {registerUser, loading}
}