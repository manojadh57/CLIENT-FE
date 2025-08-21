import api from "./axios";

export const bookmarksAPI = {
  list: async () => (await api.get("/bookmarks")).data,
  toggle: async (postId) =>
    (await api.post(`/bookmarks/${postId}/toggle`)).data,
};
