const TOKEN_KEY = "meteorite_token";

export class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

export function readToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function buildQuery(filters: Record<string, string | number>) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, String(value));
    }
  }
  const text = params.toString();
  return text ? `?${text}` : "";
}

export async function request<T>(
  route: string,
  settings: RequestInit = {},
): Promise<T> {
  const headers = new Headers(settings.headers);
  const token = readToken();

  if (token) {
    headers.set("Authorization", `Token ${token}`);
  }

  if (settings.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(route, { ...settings, headers });
  if (!response.ok) {
    throw new HttpError(response.status);
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}
