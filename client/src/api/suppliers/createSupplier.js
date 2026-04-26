import { BASE_URL, getToken } from "../config";

const createSupplier = async (form) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/suppliers`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
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

export { createSupplier };
