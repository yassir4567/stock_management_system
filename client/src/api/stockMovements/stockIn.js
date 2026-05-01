import { BASE_URL, getToken } from "../config";

const stockIn = async (formData) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/stock-in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "Stock in failed",
      };
    }

    return {
      success: true,
      message: data.message || "Success",
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "network error",
      errors: err,
    };
  }
};

export { stockIn };
