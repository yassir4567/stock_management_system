import { BASE_URL, getToken } from "../config";

const stockOut = async (formData) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/stock-out`, {
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
        message: data.message || "La sortie de stock a échoué",
      };
    }

    if (!data.success) {
      return {
        success: false,
        message: data.message || "La sortie de stock a échoué",
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

export { stockOut };
