import { clearStorage, getUserToken } from "../storage";

const SERVER_HOST = import.meta.env.VITE_API_HOST || "";

const basicCredentials = btoa(
  `${import.meta.env.VITE_BASIC_AUTH_USERNAME}:${
    import.meta.env.VITE_BASIC_AUTH_PASSWORD
  }`
);
const timeoutDuration = 30000;

export const baseFetch = async (
  endpoint: string,
  method: "POST" | "PUT" | "GET" | "DELETE" | "PATCH",
  body?: Record<string, unknown>
) => {
  const url = `${SERVER_HOST}${endpoint}`;
  const headers = new Headers();
  const controller = new AbortController();
  const user = getUserToken() as UserToken;
  const timeoutId = setTimeout(() => controller.abort(), timeoutDuration);
  const isFormData = body instanceof FormData;
  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  }
  if (!user) headers.set("Authorization", `Basic ${basicCredentials}`);
  if (user) {
    const { token } = user;
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(url, {
    method,
    headers,
    signal: controller.signal,
    body: isFormData ? body : JSON.stringify(body),
  }).then((response) => {
    clearTimeout(timeoutId);
    if ([401].includes(response.status)) {
      clearStorage();
      window.location.href = "/";
    }
    return response;
  });
};

export async function post<T>(endpoint: string, body: Record<string, unknown>) {
  const response = await baseFetch(endpoint, "POST", body);
  const data = await response.json();
  if (response.status >= 400) throw data as T;
  return data as T;
}

export async function put<T>(endpoint: string, body: Record<string, unknown>) {
  const response = await baseFetch(endpoint, "PUT", body);
  const data = await response.json();
  if (response.status >= 400) throw data as T;
  return data as T;
}

export async function patch<T>(
  endpoint: string,
  body: Record<string, unknown>
) {
  const response = await baseFetch(endpoint, "PATCH", body);
  const data = await response.json();
  if (response.status >= 400) throw data as T;
  return data as T;
}

export async function remove<T>(
  endpoint: string,
  body?: Record<string, unknown>
) {
  const response = await baseFetch(endpoint, "DELETE", body);
  const data = await response.json();
  if (response.status >= 400) throw data as T;
  return data as T;
}

export async function get<T>(
  endpoint: string,
  params?: Record<string, unknown>
) {
  const query: string = params
    ? Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join("&")
    : "";
  const response = await baseFetch(`${endpoint}?${query}`, "GET");
  const data = await response.json();
  if (response.status >= 400) throw data as T;
  return data as T;
}
