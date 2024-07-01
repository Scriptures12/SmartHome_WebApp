import { callApi } from "./shared";

const AUTH_BASE_URL = `auth`;

export async function loginUser(params) {
  const config = {
    url: `${AUTH_BASE_URL}/signin`,
    method: "POST",
    data: params,
  };

  return callApi(config);
}

export async function registerUser(
  params
) {
  const config = {
    url: `${AUTH_BASE_URL}/users`,
    method: "POST",
    data: params,
  };

  return callApi(config);
}

export async function logoutUser() {
  return "Logged Out";
}
