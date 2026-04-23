import { BASE_URL, getToken } from "../config";

async function getCategories() {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/categories`, {
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) {
      console.log("error");
      return;
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export { getCategories };
