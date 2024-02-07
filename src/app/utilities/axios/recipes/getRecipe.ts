import axios from "axios";

export async function getRecipe(id: string) {
  const baseUrl = window.location.origin;
  const result = await axios({
    method: "get",
    url: `${baseUrl}/api/recipes/${id}`
  });
  return result.data;
}
