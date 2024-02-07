"use client";
import RecipeListItem from "@/app/components/functionalities/recipes/view/recipeListPanel";
import Button from "@/app/components/generic/button";
import { LoadingPanel } from "@/app/components/generic/loadingPanel";
import { GeneratePages, PaginationPanel } from "@/app/components/generic/paginationPanel";
import FullScreenPopup from "@/app/components/popUps/schedulePopUp/fullScreenPopup";
import { RecipeType } from "@/app/types";
import { GetRecipes } from "@/app/utilities/axios/recipes/getRecipes";
import { useUser } from "@/app/utilities/contexts/user/UserContext";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Cookies } from "react-cookie";

const DeleteActionContext = createContext<((x: string) => void) | undefined>(undefined);

export function useDeleteActionContext() {
  const setDeletePopUp = useContext(DeleteActionContext);
  if (setDeletePopUp === undefined) {
    throw new Error("useDeleteActionContext must be used with DeleteActionContext.");
  }

  return setDeletePopUp;
}

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

  function InitDelete(id: string) {
    setDeletePopUp(true);
    setSelectedId(id);
  }

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    setError("");
    const matches = searchParams.get("matches")

    GetRecipes(page, matches ?? "")
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
    const result = await axios({
      method: "delete",
      url: "http://localhost:3000/api/recipes/" + id
    });
    setDeletePopUp(false);

    GetRecipes(page)
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
    <>
      <DeleteActionContext.Provider value={InitDelete}>
        <section
          id="admin-recipes-section"
          className="max-w-7xl bg-slate-500/30 mx-auto w-full p-2 sm:p-4 md:p-8 rounded-xl shadow-md shadow-black/40 flex-col"
        >
          <div className="flex flex-col gap-4 overflow-visible ">
            <div className="flex justify-between place-items-center border-b-2 pb-4 sm:pb-6 border-violet-50/40 text-white">
              <h1 className="text-2xl font-semibold">Recipes</h1>
              {user?.isSignedIn && 
              <Link href={"/admin/recipes/add"} target="_blank">
                <Button className="bg-indigo-500">Add New</Button>
              </Link>}
            </div>
            <div className="rounded-lg shadow-lg overflow-y-visible">
              <ul className="flex flex-col gap-4">
                {loading && <LoadingPanel className="text-white" />}
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
              </ul>
            </div>
            <div className="w-full p-4 bg-black flex justify-center text-white gap-2 rounded-lg shadow-md">
              <PaginationPanel setPage={setPage} page={page} pages={pages} />
            </div>
          </div>
        </section>

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
    </>
  );
}
