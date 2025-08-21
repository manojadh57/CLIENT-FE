import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postsAPI } from "../api/posts";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAll",
  async ({ page = 1, limit = 10 }) => {
    const data = await postsAPI.getAll(page, limit);
    return data.posts;
  }
);

export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId) => {
    const data = await postsAPI.getById(postId);
    return data.post;
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ title, body }, { rejectWithValue }) => {
    try {
      const res = await postsAPI.create({ title, body });
      return res.post;
    } catch (e) {
      return rejectWithValue(
        e.response?.data || { message: "Failed to create post" }
      );
    }
  }
);
export const editPost = createAsyncThunk(
  "posts/edit",
  async ({ postId, title, body }) => {
    const data = await postsAPI.edit({ postId, title, body });
    return data.post;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    all: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedPost: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetchPostById
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.all.unshift(action.payload); // add new post to top
      })

      // editPost
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.all.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.all[index] = action.payload;
        }
        if (state.selected && state.selected.id === action.payload.id) {
          state.selected = action.payload;
        }
      });
  },
});

export const { clearSelectedPost } = postsSlice.actions;
export default postsSlice.reducer;
