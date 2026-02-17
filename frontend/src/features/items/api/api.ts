import type { Item } from "../types/Item";

const URL = `http://localhost:8080/api/v1`;

export const fetchItemData = async () => {
  const res = await fetch(`${URL}/items`);
  if (!res.ok) throw new Error("Failed to fetch");
  const rawData = await res.json();

  return rawData.map((item: any) => ({
    id: item.id.toString(),
    name: item.name,
    stock: item.stock,
    price: item.price,
  }));
};

export const createItem = async (payload: Item) => {
  const res = await fetch(`${URL}/items`, {
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

export const updateItem = async (payload: Item) => {
  const res = await fetch(`${URL}/items`, {
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

export const deleteItem = async (payload: Item) => {
  const res = await fetch(`${URL}/items/${payload.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch");
  } else {
    return true;
  }
};
