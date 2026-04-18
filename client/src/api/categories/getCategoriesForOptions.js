import { BASE_URL } from "../config";

async function getCategoriesForOptions() {
  try {
    const response = await fetch(`${BASE_URL}/api/categories/options`, {
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("chi l3ba error");
    }
    const data = await response.json();

    return data ;
  } catch (err) {
    console.log(err);
  }
}

export { getCategoriesForOptions };