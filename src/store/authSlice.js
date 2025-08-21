import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

// Load from localStorage if available
const saved = JSON.parse(localStorage.getItem("auth_v1") || "null");

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (idToken, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/google", { token: idToken });
      // Expected response: { accessToken, username, userId }
      return data;
    } catch (e) {
      return rejectWithValue(e.response?.data || { message: "Login failed" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: saved || {
    accessToken: null,
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.user = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("auth_v1");
      localStorage.removeItem("token"); // ✅ clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { accessToken, username, userId } = action.payload || {};
        state.accessToken = accessToken || null;
        state.user = { username, id: userId };

        // ✅ Save token separately for axios.js to access without circular import
        localStorage.setItem("auth_v1", JSON.stringify(state));
        localStorage.setItem("token", accessToken); // ✅ critical fix
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
