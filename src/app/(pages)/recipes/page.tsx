"use client";
import RecipeListItem from "@/app/components/functionalities/recipes/view/recipeListPanel";
import Button from "@/app/components/generic/button";
import { LoadingPanel } from "@/app/components/generic/loadingPanel";
import { GeneratePages, PaginationPanel } from "@/app/components/generic/paginationPanel";
import FullScreenPopup from "@/app/components/popUps/schedulePopUp/fullScreenPopup";
import { RecipeType } from "@/app/types";
import { useUser } from "@/app/utilities/contexts/user/UserContext";
import axios from "axios";
import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState } from "react";
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
  const cookies = new Cookies();
  const [favRecipes, setFavRecipes] = useState<string[]>(cookies.get("favoriteRecipes") ?? []);

  function InitDelete(id: string) {
    setDeletePopUp(true);
    setSelectedId(id);
  }

  const { user } = useUser();

  useEffect(() => {
    setLoading(true);
    setError("");

    // let x = {
    //     "recipes": [
    //         {
    //             "cookTime": {
    //                 "prep": 0,
    //                 "idle": 0
    //             },
    //             "_id": "65555714ad5348d57b9eb56a",
    //             "title": "Spicy Chicken and Rice Soup",
    //             "summary": "A hearty and comforting soup with tender chicken, rice, vegetables and a touch of heat from chili flakes. This soup is easy to make and perfect for a cold day.",
    //             "vegan": true,
    //             "vegetarian": true,
    //             "rating": 0,
    //             "thumbnailUrl": "",
    //             "imageUrl": "",
    //             "ingredients": [],
    //             "createdAt": "2023-11-15T23:41:08.607Z",
    //             "updatedAt": "2023-11-15T23:41:08.607Z",
    //             "__v": 0
    //         },
    //         {
    //             "cookTime": {
    //                 "prep": 0,
    //                 "idle": 0
    //             },
    //             "_id": "65555722ad5348d57b9eb571",
    //             "title": "Apple Cinnamon Muffins",
    //             "summary": "A delicious and moist muffin with chunks of fresh apples and a cinnamon sugar topping. These muffins are great for breakfast or a snack, and can be made in less than 30 minutes.",
    //             "vegan": true,
    //             "vegetarian": true,
    //             "rating": 0,
    //             "thumbnailUrl": "",
    //             "imageUrl": "",
    //             "ingredients": [],
    //             "createdAt": "2023-11-15T23:41:22.048Z",
    //             "updatedAt": "2023-11-15T23:41:22.048Z",
    //             "__v": 0
    //         },
    //         {
    //             "cookTime": {
    //                 "prep": 0,
    //                 "idle": 0
    //             },
    //             "_id": "6555572dad5348d57b9eb577",
    //             "title": "Creamy Mushroom Pasta",
    //             "summary": "A simple and satisfying pasta dish with a creamy mushroom sauce. You can use any kind of pasta you like, and customize the sauce with your favorite herbs and cheese.",
    //             "vegan": true,
    //             "vegetarian": true,
    //             "rating": 0,
    //             "thumbnailUrl": "",
    //             "imageUrl": "",
    //             "ingredients": [],
    //             "createdAt": "2023-11-15T23:41:33.732Z",
    //             "updatedAt": "2023-11-15T23:41:33.732Z",
    //             "__v": 0
    //         },
    //         {
    //             "cookTime": {
    //                 "prep": 0,
    //                 "idle": 0
    //             },
    //             "_id": "65555737ad5348d57b9eb57d",
    //             "title": "Salmon and Avocado Salad",
    //             "summary": "A fresh and healthy salad with flaky salmon, creamy avocado, crisp lettuce and a tangy lemon dressing. This salad is high in protein and healthy fats, and can be enjoyed as a main or a side dish.",
    //             "vegan": true,
    //             "vegetarian": true,
    //             "rating": 0,
    //             "thumbnailUrl": "",
    //             "imageUrl": "",
    //             "ingredients": [],
    //             "createdAt": "2023-11-15T23:41:43.519Z",
    //             "updatedAt": "2023-11-15T23:41:43.519Z",
    //             "__v": 0
    //         },
    //         {
    //             "cookTime": {
    //                 "prep": 0,
    //                 "idle": 0
    //             },
    //             "_id": "65555742ad5348d57b9eb583",
    //             "title": "Chocolate Chip Cookies",
    //             "summary": "A classic and irresistible cookie with soft and chewy centers and crispy edges. These cookies are loaded with chocolate chips and have a hint of vanilla flavor. They are easy to make and always a crowd-pleaser.",
    //             "vegan": true,
    //             "vegetarian": true,
    //             "rating": 0,
    //             "thumbnailUrl": "",
    //             "imageUrl": "",
    //             "ingredients": [],
    //             "createdAt": "2023-11-15T23:41:54.927Z",
    //             "updatedAt": "2023-11-15T23:41:54.927Z",
    //             "__v": 0
    //         }
    //     ],
    //     "resultsCount": 7
    // }

    GetPosts(page)
      .then((x) => {
        setRecipes([...x.recipes]);
        setLoading(false);
        setPages(GeneratePages(page, x.resultsCount));
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    cookies.set("favoriteRecipes", favRecipes);
  }, [favRecipes]);

  async function GetPosts(page: number) {
    const result = await axios({
      method: "get",
      url: "http://localhost:3000/api/recipes",
      params: {
        page: page ?? 1
      }
    });

    return result.data;
  }

  async function DeleteRecipe(id: string) {
    const result = await axios({
      method: "delete",
      url: "http://localhost:3000/api/recipes/" + id
    });
    setDeletePopUp(false);

    GetPosts(page)
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
                  recipes.map((x) => (
                    <RecipeListItem
                      favRecipes={favRecipes}
                      setFavRecipes={setFavRecipes}
                      key={x._id}
                      recipe={x}
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
