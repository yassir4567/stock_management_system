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
        message: data.message || "L'entrée de stock a échoué",
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
      errors: err,
    };
  }
};

export { stockIn };
