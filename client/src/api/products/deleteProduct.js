import { BASE_URL } from "../config";

const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
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
};

export { deleteProduct };
