const URL = `http://localhost:3000/api/v1`;

export const fetchCustomerData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  const rawData = await res.json();

  return rawData.map((user: any) => ({
    id: user.id.toString(),
    name: user.name,
    address: `${user.address.city}, ${user.address.street}`,
  }));
};
