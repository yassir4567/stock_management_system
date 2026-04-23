import { BASE_URL, getToken } from "../config";

const getCurrentUser = async (formData) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
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
      message: data.message || "User retreived successfully",
      user: data,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network error",
    };
  }
};

export { getCurrentUser };
