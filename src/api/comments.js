import api from "./axios";

export const commentsAPI = {
  get: async (postId) => (await api.get(`/comments/${postId}`)).data,

  create: async ({ postId, body, parentCommentId }) =>
    (await api.post(`/comments`, { postId, body, parentCommentId })).data,

  edit: async (id, body) => (await api.patch(`/comments/${id}`, { body })).data,

  delete: async (id) => (await api.delete(`/comments/${id}`)).data,
};
