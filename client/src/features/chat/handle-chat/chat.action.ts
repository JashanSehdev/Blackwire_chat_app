import { api, getErrorMessage } from "@/api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";
import { createPrivateChat } from "./chat.type";
import { Chat } from "@/type/chat.type";
import { ChatTypeEnum } from "@/enum/chat.enum";
import { SuccessResponse } from "@/type/meta.type";

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