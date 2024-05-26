"use client";
import RecipeListItem from "@/app/components/functionalities/recipes/view/recipeListPanel";
import { LoadingPanel } from "@/app/components/generic/loadingPanel";
import { SectionWrapper } from "@/app/components/generic/SectionWrapper";
import { RecipeType } from "@/app/types";
import { postFetchFavoriteRecipes } from "@/app/utilities/axios/recipes/postFetchFavoriteRecipes";
import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { BsHeartFill } from "react-icons/bs";

export default function FavoriteRecipes() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const cookies = useMemo(() => new Cookies(), []);
  const [favRecipes, setFavRecipes] = useState<string[]>(cookies.get("favoriteRecipes") ?? []);

  useEffect(() => {
    setLoading(true);
    setError("");

    postFetchFavoriteRecipes(favRecipes)
      .then((x) => {
        setRecipes([...x.recipes]);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [favRecipes]);

  useEffect(() => {
    cookies.set("favoriteRecipes", favRecipes);
  }, [cookies, favRecipes]);

  return (
    <SectionWrapper id="recipes-section">
      <div className="flex flex-col h-full gap-3 sm:gap-4 overflow-visible flex-1">
        <div className="flex max-xs:flex-col max-sm:gap-2 justify-between sm:place-items-center sm:pb-6 text-white">
          <h1 className="text-2xl font-semibold flex gap-1 place-items-center">
            <BsHeartFill className={`fill-red-500 h-full aspect-square shrink-0`} />
            Ulubione Przepisy
          </h1>
        </div>
        <div className="flex flex-col flex-1">
          <div className="overflow-y-visible h-full border-t-2 border-violet-50/40 pt-4 flex flex-col flex-1 justify-between">
            <ul className="flex flex-col gap-4 flex-1 h-full">
              {loading && <LoadingPanel className="text-white h-full" />}
              {!loading && recipes.length ? (
                recipes.map((recipe: RecipeType) => (
                  <RecipeListItem
                    favRecipes={favRecipes}
                    setFavRecipes={setFavRecipes}
                    key={recipe._id}
                    recipe={recipe}
                  />
                ))
              ) : (
                <></>
              )}
              {!loading && error && <div>{error}</div>}
              {!loading && !recipes.length && <div className="flex flex-1 h-full m-auto">
                <span className="text-white m-auto h-full flex-1">Brak ulubionych przepisów</span>
              </div>}
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
