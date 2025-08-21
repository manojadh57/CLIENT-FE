import api from "./axios";

export const votesAPI = {
  getPostVotes: async (postId) =>
    (await api.get(`/votes/posts/${postId}`)).data,

  votePost: async (postId, dir) =>
    (await api.post(`/votes/posts/${postId}`, { dir })).data,

  getCommentVotes: async (commentId) =>
    (await api.get(`/votes/comments/${commentId}`)).data,

  voteComment: async (commentId, dir) =>
    (await api.post(`/votes/comments/${commentId}`, { dir })).data,
};
