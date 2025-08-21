import api from "./axios";

export const stripeAPI = {
  createDMUnlockSession: async () => {
    const res = await api.post("/billing/dm-unlock/session", {});
    return res.data; // contains .url to redirect to Stripe checkout
  },
};
