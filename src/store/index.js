import { configureStore } from "@reduxjs/toolkit";
import posts from "./postsSlice";
import auth from "./authSlice";
import comments from "./commentsSlice";
import messages from "./messagesSlice";
import bookmarks from "./bookmarksSlice";

const store = configureStore({
  reducer: {
    posts,
    auth,
    comments,
    messages,
    bookmarks,
  },
});

export * from "./hooks";
export { store };
export default store;
