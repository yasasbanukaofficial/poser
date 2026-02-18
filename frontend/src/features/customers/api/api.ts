import { handleApiRequest } from "../../../api/api";
import type { Customer } from "../types/Customer";

export const fetchCustomerData = () => handleApiRequest("customers", "GET");
export const createCustomer = (payload: Customer) =>
  handleApiRequest("customers", "POST", payload);
export const updateCustomer = (payload: Customer) =>
  handleApiRequest("customers", "PUT", payload);
export const deleteCustomer = (payload: Customer) =>
  handleApiRequest("customers", "DELETE", payload);
