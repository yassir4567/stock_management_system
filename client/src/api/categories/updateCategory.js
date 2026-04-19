import { BASE_URL } from "../config";

const updateCategory = async (form, id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      console.log("err");
      return;
    }

    const data = await response.json();

    return data;

  } catch (err) {
    console.log(err);
  }
};

export { updateCategory };
