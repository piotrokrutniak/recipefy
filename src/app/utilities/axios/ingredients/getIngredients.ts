import axios from "axios";

export async function getIngredients(page: number, matches: string) {
  const baseUrl = window.location.origin;
  const result = await axios({
    method: "get",
    url: `${baseUrl}/api/ingredients`,
    params: {
      page: page ?? 1,
      matches: matches
    }
  });

  return result.data;
}
