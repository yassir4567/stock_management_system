import { BASE_URL, getToken } from "../config";

export const getDashboardStats = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok || data.success) {
      return {
        success: false,
        message: data.message || "Failed",
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
      message: err.message || "Network error",
    };
  }
};
