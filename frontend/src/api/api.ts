const URL = `http://localhost:8080/api/v1`;

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const handleAPIRequest = async <T extends { id?: string | number }>(
  entity: string,
  method: HttpMethod,
  payload?: T,
) => {
  const isIdRequest = (method === "DELETE" || method === "GET") && payload?.id;

  const endpoint = isIdRequest
    ? `${URL}/${entity}/${payload.id}`
    : `${URL}/${entity}`;

  const options: RequestInit = {
    method: method,
    headers: { "Content-Type": "application/json" },
  };

  if (["POST", "PUT"].includes(method) && payload) {
    options.body = JSON.stringify(payload);
  }

  const rawResponse = await fetch(endpoint, options);

  if (!rawResponse.ok) {
    throw new Error(`Failed to ${method} ${entity}: ${rawResponse.statusText}`);
  }

  const result = await rawResponse.json();

  if (method === "GET") {
    return result.data;
  }

  return true;
};
