import { BASE_URL, getToken } from "../config";

const createProduct = async (form) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || "fetch error",
      };
    }
    return {
      success: true,
      data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

export { createProduct };
