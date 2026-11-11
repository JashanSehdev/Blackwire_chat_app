import { api, getErrorMessage } from "@/api/api";
import { FilterInput } from "@/components/admin/users/user-toolbar/user-toolbar.type";
import { RootState } from "@/features/store";
import { PaginationRequest, PaginationResponse } from "@/type/meta.type";
import { AdminUser } from "@/type/user.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { ChangeAccess, EditUserByAdmin } from "./users.type";
import { EditUserInput } from "@/components/admin/users/edit-user/edit-user-form/edit-user-form.type";


type data = {
    avatar : string
}
export const changeAvatarAsync = createAsyncThunk <{data : data}, data, {state: RootState}>(
    'user/changeAvatar',
    async({avatar}:{avatar : string}, thunkApi) => {
        try {
            const state = thunkApi.getState()
            const response = await api.patch(`users/${state.auth.user?.id}/avatar`, {avatar})
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

//admin Thunk
export const fetchUsersAsync = createAsyncThunk <PaginationResponse<AdminUser>, FilterInput & PaginationRequest | void>(
    'user/changeAvatar',
    async(filters, thunkApi) => {
        try {
            const response = await api.get('/users', {
                params: filters
            })
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)


export const changeAccessAsync = createAsyncThunk <AdminUser, ChangeAccess>(
    'user/change-access',
    async({userId, block}, thunkApi) => {
        try {
            const response = await api.patch(`users/${userId}/access`, {block})
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const EditUserByAdminAsync = createAsyncThunk <AdminUser, EditUserByAdmin >(
    'user/edit-user',
    async(data, thunkApi) => {
        try {
            const {userId, ...userData} = data
            const response = await api.patch(`users/${userId}`, userData)
            return response.data
        } catch (error) {
            enqueueSnackbar(getErrorMessage(error))
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)