import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { commentsAPI } from "../api/comments";

export const fetchCommentsByPost = createAsyncThunk(
  "comments/fetchByPost",
  async (postId, { rejectWithValue }) => {
    try {
      const list = await commentsAPI.list(postId);
      return { postId, list };
    } catch (e) {
      return rejectWithValue({
        postId,
        message: e.response?.data?.message || "Failed to load comments",
      });
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: { byPostId: {}, statusByPost: {}, errorByPost: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByPost.pending, (state, action) => {
        const postId = action.meta.arg;
        state.statusByPost[postId] = "loading";
        state.errorByPost[postId] = null;
      })
      .addCase(fetchCommentsByPost.fulfilled, (state, action) => {
        const { postId, list } = action.payload;
        state.statusByPost[postId] = "succeeded";
        state.byPostId[postId] = Array.isArray(list) ? list : [];
      })
      .addCase(fetchCommentsByPost.rejected, (state, action) => {
        const { postId, message } = action.payload || {};
        state.statusByPost[postId] = "failed";
        state.errorByPost[postId] = message || "Failed to load comments";
      });
  },
});

export default commentsSlice.reducer;
