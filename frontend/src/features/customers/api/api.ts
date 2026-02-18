import { handleAPIRequest } from "../../../api/api";
import type { Customer } from "../types/Customer";

export const customerAPI = {
  getAll: async () => handleAPIRequest("customers", "GET"),
  get: async (id: string) => handleAPIRequest(`customers/${id}`, "GET"),
  create: async (payload: Customer) =>
    handleAPIRequest("customers", "POST", payload),
  update: async (payload: Customer) =>
    handleAPIRequest(`customers`, "PUT", payload),
  delete: async (id: string) => handleAPIRequest(`customers/${id}`, "DELETE"),
};
