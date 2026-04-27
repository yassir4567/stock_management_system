import { BASE_URL, getToken } from "../config";

async function deleteSupplier(id) {
  try {
    const token = getToken() ;
    const response = await fetch(`${BASE_URL}/api/suppliers/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!response.ok) {
      console.log("error");
      return;
    }
    const data = await response.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export { deleteSupplier };
