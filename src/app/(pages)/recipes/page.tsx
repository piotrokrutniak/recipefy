"use client";
import RecipeListItem from "@/app/components/functionalities/recipes/view/recipeListPanel";
import Button from "@/app/components/generic/button";
import { LoadingPanel } from "@/app/components/generic/loadingPanel";
import { GeneratePages, PaginationPanel } from "@/app/components/generic/paginationPanel";
import SearchBar from "@/app/components/generic/searchBar";
import { SectionWrapper } from "@/app/components/generic/SectionWrapper";
import FullScreenPopup from "@/app/components/popUps/schedulePopUp/fullScreenPopup";
import { RecipeType } from "@/app/types";
import { getRecipes } from "@/app/utilities/axios/recipes/getRecipes";
import { DeleteActionContext } from "@/app/utilities/contexts/ingredients/DeleteActionContext";
import { useUser } from "@/app/utilities/contexts/user/UserContext";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Cookies } from "react-cookie";
import { BsHeartFill, BsJournalPlus } from "react-icons/bs";
import { FaReceipt } from "react-icons/fa";

export default function Recipes() {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const cookies = useMemo(() => new Cookies(), []);
  const [favRecipes, setFavRecipes] = useState<string[]>(cookies.get("favoriteRecipes") ?? []);
  const searchParams = useSearchParams();
  const [matches] = useState<string | undefined>(searchParams.get("matches") ?? undefined);

  function InitDelete(id: string) {
    setDeletePopUp(true);
    setSelectedId(id);
  }

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    setError("");
    const matches = searchParams.get("matches")

    getRecipes(page, matches ?? "")
      .then((x) => {
        setRecipes([...x.recipes]);
        setLoading(false);
        setPages(GeneratePages(page, x.resultsCount));
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page, searchParams]);

  useEffect(() => {
    cookies.set("favoriteRecipes", favRecipes);
  }, [cookies, favRecipes]);

  async function DeleteRecipe(id: string) {
    const baseUrl = window.location.origin;
    const result = await axios({
      method: "delete",
      url: `${baseUrl}/api/recipes/` + id
    });
    setDeletePopUp(false);

    getRecipes(page)
      .then((x) => {
        setRecipes([...x.recipes]);
        setLoading(false);
        setPages(GeneratePages(page, x.resultsCount));
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    return result.data;
  }

  return (
    <DeleteActionContext.Provider value={InitDelete}>
      <SectionWrapper id="recipes-section">
        <div className="flex flex-col h-full gap-3 sm:gap-4 overflow-visible flex-1">
          <div className="flex max-xs:flex-col max-sm:gap-2 justify-between sm:place-items-center sm:pb-6 text-white">
            <h1 className="text-2xl font-semibold flex gap-1 place-items-center"><FaReceipt className={"text-vermilion-400"}/>Przepisy</h1>
            <div className="flex gap-2 justify-end">
              <Link href={"/recipes/favorites"}>
                <Button className="bg-gray-950 hover:bg-opacity-70 active:opacity-70"> 
                  <BsHeartFill
                    className={`fill-red-500 h-full aspect-square shrink-0`}
                  />
                  Idź do ulubionych 
                </Button>
              </Link>
              {user?.isSignedIn && 
              <Link href={"/admin/recipes/add"} target="_blank">

                <Button className="bg-indigo-500"> 
                  <BsJournalPlus
                    className={`fill-white h-full aspect-square shrink-0`}
                  />
                  Dodaj 
                </Button>
              </Link>}
            </div>
          </div>
          <SearchBar initialValue={matches}/>
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
                  <span className="text-white m-auto h-full flex-1">Brak przepisów</span>
                </div>}
              </ul>
            </div>
            {!!recipes.length && <div className="w-full p-4 bg-black flex justify-center text-white gap-2 rounded-lg shadow-md">
              <PaginationPanel setPage={setPage} page={page} pages={pages} />
            </div>}
          </div>
        </div>
      </SectionWrapper>

      {deletePopUp && (
        <FullScreenPopup>
          <h2 className="text-white">Are you sure you want to delete this recipe?</h2>
          <div className="flex justify-end gap-2 text-white mt-4">
            <Button className="bg-red-600" onClick={() => DeleteRecipe(selectedId)}>
              Delete
            </Button>
            <Button
              className="bg-gray-800"
              onClick={() => {
                setDeletePopUp(false);
                setSelectedId("");
              }}
            >
              Cancel
            </Button>
          </div>
        </FullScreenPopup>
      )}
    </DeleteActionContext.Provider>
  );
}
