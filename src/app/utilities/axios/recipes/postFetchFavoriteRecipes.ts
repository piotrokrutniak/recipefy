import axios from "axios";

export async function postFetchFavoriteRecipes(ids: string[]) {
  const baseUrl = window.location.origin;
  const result = await axios({
    method: "post",
    url: `${baseUrl}/api/recipes/batch/`,
    data: ids
  });

  return result.data;
}