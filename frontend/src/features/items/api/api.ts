import { handleAPIRequest } from "../../../api/api";
import type { Item } from "../types/Item";

export const itemAPI = {
  getAll: async () => handleAPIRequest("items", "GET"),
  get: async (id: string) => handleAPIRequest(`items/${id}`, "GET"),
  create: async (payload: Item) => handleAPIRequest("items", "POST", payload),
  update: async (payload: Item) => handleAPIRequest(`items`, "PUT", payload),
  delete: async (id: string) => handleAPIRequest(`items/${id}`, "DELETE"),
};
