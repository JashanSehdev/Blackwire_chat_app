import { Chat } from "@/type/chat.type";
import { createSlice } from "@reduxjs/toolkit";
import { createPrivateChatAsync } from "./handle-chat/chat.action";


type InitialState = {
  chats : Chat[],
  loading: boolean
};

const initialState: InitialState = {
  chats : [],
  loading: false
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createPrivateChatAsync.fulfilled, (state, action) => {
        state.chats.push(action.payload.data);
        state.loading = false
    })
    .addCase(createPrivateChatAsync.pending,(state) => {
        state.loading = true
    })
    .addCase(createPrivateChatAsync.rejected,(state) => {
        state.loading = false
    })
}
});

export default authSlice.reducer
