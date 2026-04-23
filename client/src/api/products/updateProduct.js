import { BASE_URL, getToken } from "../config";

const updateProduct = async (form, id) => {
  try {
    const token = getToken()
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      console.log("err");
      return;
    }

    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
};

export { updateProduct };
