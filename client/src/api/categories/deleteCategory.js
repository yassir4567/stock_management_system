import { BASE_URL } from "../config";

async function deleteCategory(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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

export { deleteCategory };
