import { BASE_URL } from "../config";

const loginUser = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || "error in response",
      };
    }

    return {
      success: true,
      message: data.message || "",
      data: data,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network error",
    };
  }
};

export { loginUser };
