// src/store/messagesSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { messagesAPI } from "../api/messages";

export const fetchInbox = createAsyncThunk("messages/inbox", messagesAPI.inbox);
export const fetchOutbox = createAsyncThunk(
  "messages/outbox",
  messagesAPI.outbox
);
export const fetchThread = createAsyncThunk(
  "messages/thread",
  async (userId) => {
    const data = await messagesAPI.thread(userId);
    return { userId, data };
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    inbox: [],
    outbox: [],
    threads: {}, // { userId: [messages] }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInbox.fulfilled, (state, action) => {
        state.inbox = action.payload?.messages || action.payload || [];
      })
      .addCase(fetchOutbox.fulfilled, (state, action) => {
        state.outbox = action.payload?.messages || action.payload || [];
      })
      .addCase(fetchThread.fulfilled, (state, action) => {
        const { userId, data } = action.payload;
        state.threads[userId] = data?.messages || data || [];
      });
  },
});

export default messagesSlice.reducer;
