const URL = `http://localhost:8080/api/v1`;

export const fetchCustomerData = async () => {
  const res = await fetch(`${URL}/customers`);
  if (!res.ok) throw new Error("Failed to fetch");
  const rawData = await res.json();

  return rawData.map((user: any) => ({
    id: user.id.toString(),
    name: user.name,
    address: `${user.address.city}, ${user.address.street}`,
  }));
};

export const sendCustomerData = async () => {
  const res = await fetch(`${URL}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json();
};
