import { saveToken, request } from "./client"

export async function login(user: string, password: string) {

  const response = await request<{ token: string }>("/api/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password }),
  })

  saveToken(response.token)

  return response.token

}