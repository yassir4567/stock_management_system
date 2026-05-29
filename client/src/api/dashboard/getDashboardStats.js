import { BASE_URL, getToken } from "../config";

export const getDashboardStats = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/dashboard-stats`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Échec de l'opération",
      };
    }

    return {
      success: true,
      message: data.message || "Succès",
      data: data.data,
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || "Erreur réseau",
    };
  }
};
