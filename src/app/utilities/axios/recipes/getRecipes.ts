import axios from "axios";

export async function getRecipes(page: number, matches?: string) {
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

export async function getRecipesAdmin(page: number, matches?: string) {
  const baseUrl = window.location.origin;
  const result = await axios({
    method: "get",
    url: `${baseUrl}/api/recipes/unpublished`,
    params: {
      page: page ?? 1,
      matches: matches
    }
  });

  return result.data;
}
