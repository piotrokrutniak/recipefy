import axios from "axios";

export async function getRecipe(id: string) {
  const result = await axios({
    method: "get",
    url: "http://localhost:3000/api/recipes/" + id
  });
  return result.data;
}
