import type { Customer } from "../types/Customer";

const URL = `http://localhost:8080/api/v1`;

export const fetchCustomerData = async () => {
  const res = await fetch(`${URL}/customers`);
  if (!res.ok) throw new Error("Failed to fetch");
  const rawData = await res.json();

  return rawData.map((user: any) => ({
    id: user.id.toString(),
    name: user.name,
    address: `${user.address}`,
  }));
};

export const createCustomer = async (payload: Customer) => {
  const res = await fetch(`${URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  } else {
    return true;
  }
};

export const updateCustomer = async (payload: Customer) => {
  console.log(payload);
  const res = await fetch(`${URL}/customers`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  } else {
    return true;
  }
};
