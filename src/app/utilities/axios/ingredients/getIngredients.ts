import axios from "axios";

export async function getIngredients(page: number, matches: string) {
  const result = await axios({
    method: "get",
    url: "http://localhost:3000/api/ingredients",
    params: {
      page: page ?? 1,
      matches: matches
    }
  });

  return result.data;
}
