import { BASE_URL, getToken } from "../config";

const deleteProduct = async (id) => {
  try {
    const token = getToken();

    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.log("error");
      return;
    }

    
    return data;
  } catch (err) {
    console.log(err);
  }
};

export { deleteProduct };
