import { handleAPIRequest } from "../../../api/api";
import type { Order } from "../types/Order";

export const orderAPI = {
  getAll: async () => handleAPIRequest("orders", "GET"),
  get: async (id: string) => handleAPIRequest(`orders/${id}`, "GET"),
  create: async (payload: Order) => handleAPIRequest("orders", "POST", payload),
  update: async (payload: Order) =>
    handleAPIRequest(`orders/${payload.id}`, "PUT", payload),
  delete: async (id: string) => handleAPIRequest(`orders/${id}`, "DELETE"),
};
