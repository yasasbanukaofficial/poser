import { handleApiRequest } from "../../../api/api";
import type { Item } from "../types/Item";

export const fetchCustomerData = () => handleApiRequest("items", "GET");
export const createItem = (payload: Item) =>
  handleApiRequest("items", "POST", payload);

export const updateItem = (payload: Item) =>
  handleApiRequest("items", "PUT", payload);

export const deleteItem = (payload: Item) =>
  handleApiRequest("items", "DELETE", payload);
