const URL = `http://localhost:8080/api/v1`;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const handleApiRequest = async <T extends { id?: string | number }>(
  entity: string,
  method: HttpMethod,
  payload?: T,
) => {
  const endpoint =
    (method === "DELETE" || (method === "GET" && payload?.id)) && payload?.id
      ? `${URL}/${entity}/${payload.id}`
      : `${URL}/${entity}`;

  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (["POST", "PUT"].includes(method) && payload) {
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(endpoint, options);

  if (!res.ok) {
    throw new Error(`Failed to ${method} ${entity}: ${res.statusText}`);
  }

  if (method === "GET") {
    return await res.json();
  }

  return true;
};
