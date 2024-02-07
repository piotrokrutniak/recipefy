import axios from "axios";

export async function GetRecipes(page: number, matches?: string) {
  const result = await axios({
    method: "get",
    url: "http://localhost:3000/api/recipes",
    params: {
      page: page ?? 1,
      matches: matches
    }
  });

  return result.data;
}