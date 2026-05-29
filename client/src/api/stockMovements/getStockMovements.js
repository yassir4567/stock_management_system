import { BASE_URL, getToken } from "../config";

async function getStockMovements(productId) {
  try {
    const query = productId ? `?product_id=${productId}` : "";
    const token = getToken();
    const response = await fetch(`${BASE_URL}/api/stock-movements${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error("Impossible de récupérer les mouvements de stock");
    }

    const data = await response.json();

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
}

export { getStockMovements };
