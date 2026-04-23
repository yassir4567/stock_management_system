export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function getToken() {
  return localStorage.getItem("token");
}
