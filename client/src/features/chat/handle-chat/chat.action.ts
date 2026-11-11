import { api, getErrorMessage } from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { createGroupRequest, createPrivateChat } from "./chat.type";
import { Chat } from "@/type/chat.type";
import { ChatTypeEnum } from "@/enum/chat.enum";
import { FilterRequest, SuccessResponse } from "@/type/meta.type";
import { GroupInput } from "@/app/(navbar-required)/messages/create-chat/create-group/create-group.type";

export const createPrivateChatAsync = createAsyncThunk<SuccessResponse<Chat>,createPrivateChat>(
    'chats/create-privateChat',
    async(data, thunkApi) => {
        try{
            const response = await api.post("/chats", {...data, type: ChatTypeEnum.PRIVATE});
            return response.data
        } catch (error : unknown) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const fetchChatsAsync = createAsyncThunk<SuccessResponse<Chat[]>, FilterRequest | void>(
    'chats/fetch-chats',
    async(filters, thunkApi) => {
        try{
            const response = await api.get("/chats", {
                params : filters
            });
            return response.data
        } catch (error : unknown) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)

export const createGroupAsync = createAsyncThunk<SuccessResponse<Chat>,createGroupRequest>(
    'chats/create-group',
    async(data, thunkApi) => {
        try{
            const response = await api.post("/chats/group", data);
            return response.data
        } catch (error : unknown) {
            enqueueSnackbar(getErrorMessage(error));
            return thunkApi.rejectWithValue(getErrorMessage(error))
        }
    }
)