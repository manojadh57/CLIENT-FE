import api from "./axios";

export const messagesAPI = {
  inbox: async () => (await api.get("/messages/inbox")).data,
  outbox: async () => (await api.get("/messages/outbox")).data,
  thread: async (userId) => (await api.get(`/messages/thread/${userId}`)).data,
  send: async ({ toUserId, body }) =>
    (await api.post("/messages", { toUserId, body })).data,
};
