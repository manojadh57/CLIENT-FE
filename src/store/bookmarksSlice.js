import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bookmarksAPI } from "../api/bookmarks";

export const fetchBookmarks = createAsyncThunk(
  "bookmarks/fetch",
  bookmarksAPI.list
);
export const toggleBookmark = createAsyncThunk(
  "bookmarks/toggle",
  async (postId) => {
    await bookmarksAPI.toggle(postId);
    return postId;
  }
);

const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    items: [], // list of bookmarked posts
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.items = action.payload?.posts || action.payload || [];
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        const postId = action.payload;
        const existing = state.items.find(
          (p) => p._id === postId || p.id === postId
        );
        if (existing) {
          // Remove from bookmarks
          state.items = state.items.filter(
            (p) => p._id !== postId && p.id !== postId
          );
        } else {
          // Optional: fetchBookmarks again
        }
      });
  },
});

export default bookmarksSlice.reducer;
