import api from "./axios";

export const postsAPI = {
  getAll: async (page = 1, limit = 10) =>
    (await api.get(`/posts?page=${page}&limit=${limit}`)).data,

  getById: async (id) => (await api.get(`/posts/${id}`)).data,

  create: async ({ title, body }) =>
    (await api.post("/posts", { title, body })).data,

  edit: async ({ postId, title, body }) =>
    (await api.patch(`/posts/${postId}`, { title, body })).data,
};
