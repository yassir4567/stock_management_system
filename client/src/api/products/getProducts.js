import { BASE_URL } from "../config";

async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`) ;
    if(!response.ok) {
      throw new Error('Chi 7aja makhdamach') ;
    }
    const data = await response.json() 

    return data ;
  } catch (err) {
    console.log(err);
  }
}

export { getProducts };
