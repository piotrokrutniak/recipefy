import axios from "axios";

export async function GetRecipes(page: number, matches?: string) {
  const baseUrl = window.location.origin;
  const result = await axios({
    method: "get",
    url: `${baseUrl}/api/recipes/`,
    params: {
      page: page ?? 1,
      matches: matches
    }
  });

  return result.data;
}