import { BASE_URL } from "../config";

const createProduct = async (form) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form),
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

export { createProduct };
