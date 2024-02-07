import axios from "axios";

export async function getRecipeDetails(id: string) {
  const baseUrl = window.location.origin;
  const result = await axios({
    method: "get",
    url: `${baseUrl}/api/recipes/` + id + "/details"
  });
  return result.data;
}
