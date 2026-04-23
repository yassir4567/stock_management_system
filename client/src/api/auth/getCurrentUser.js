import { BASE_URL, getToken } from "../config";

const getCurrentUser = async (formData) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export { getCurrentUser };
