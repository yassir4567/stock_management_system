import { BASE_URL, getToken } from "../config";

async function getSuppliersForOptions() {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/suppliers/options`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) {
      throw new Error("Une erreur est survenue");
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export { getSuppliersForOptions };
