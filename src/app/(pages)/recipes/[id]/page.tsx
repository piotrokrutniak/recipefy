"use client";
import { IngredientType, RecipeType } from "@/app/types";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { GetDateTime } from "@/app/utilities/globalMethods";
import { RecipeContext } from "@/app/components/functionalities/recipes/recipeContext";
import { patchRecipe } from "@/app/utilities/axios/recipes/patchRecipe";
import { getRecipe } from "@/app/utilities/axios/recipes/getRecipe";
import { putRecipeDetails } from "@/app/utilities/axios/recipes/details/putDetails";
import { getRecipeDetails } from "@/app/utilities/axios/recipes/details/getDetails";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Cookies } from "react-cookie";
import Rating from "@/app/components/generic/rating";
import RatingActive from "@/app/components/generic/ratingActive";
import TextArea from "@/app/components/generic/textArea";
import Button from "@/app/components/generic/button";
import Image from "next/image";
import clsx from "clsx";
import { QuillMarkUpParser } from "@/app/components/generic/quill/QuillMarkUpParser";

export default function ViewRecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<RecipeType>({
    title: "",
    summary: "",
    cookTime: {
      prep: 0,
      idle: 0
    },
    recipeDetails: {
      _id: params.id,
      desc: "",
      recipeId: params.id
    },
    rating: 0,
    thumbnailUrl: "",
    imageUrl: "",
    ingredients: []
  });

  const cookies = useMemo(() => new Cookies(), []);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [validated, setValidated] = useState<boolean>(false);
  const [favRecipes, setFavRecipes] = useState<string[]>(cookies.get("favoriteRecipes") ?? []);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setSaved(favRecipes.findIndex((x) => x == params.id) > -1);
    setValidated(recipe.title.length > 0 && recipe.summary.length > 0);
    getRecipe(params.id)
      .then((x) => {
        return { ...x.recipe, recipeDetails: recipe.recipeDetails };
      })
      .then((tempRecipe) => {
        getRecipeDetails(params.id).then((x) => {
          tempRecipe.recipeDetails = x.recipeDetails ?? "<p></p>";
          setRecipe({ ...tempRecipe });
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setSaved(favRecipes.findIndex((x) => x == params.id) > -1);
    cookies.set("favoriteRecipes", favRecipes);
  }, [cookies, favRecipes, params.id]);

  function toggleSaved() {
    if (recipe._id) {
      const index = favRecipes.findIndex((x) => x == recipe._id);
      const temp = favRecipes;
      if (index > -1) {
        setSaved(false);
        temp.splice(index, 1);

        setFavRecipes([...temp]);
      } else {
        setSaved(true);
        temp.push(recipe._id);
        setFavRecipes([...temp]);
      }
    }
  }

  function submitAction(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    if (validated) {
      patchRecipe(recipe)
        .then(() => {
          putRecipeDetails(recipe.recipeDetails);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
          setRecipe((recipe) => ({ ...recipe, updatedAt: GetDateTime() }));
        });
    }
  }

  function removeIngredient(index: number) {
    recipe.ingredients.splice(index, 1);
    setRecipe({ ...recipe });
  }

  return (
    <RecipeContext.Provider value={{ recipe: recipe, setRecipe: setRecipe }}>
      <section
        id="recipe-view-section"
        className="max-w-4xl bg-slate-500/30 mx-auto w-full max-sm:p-4 p-8 sm:rounded-xl sm:shadow-md shadow-black/40 flex flex-col gap-6"
        onSubmit={(e) => submitAction(e)}
      >
        <section className="flex flex-col gap-8">
          <div className="flex justify-between gap-8">
            {loading ? (
              <h1 className="bg-coal-400 text-transparent rounded-lg w-full animate-pulse">
                No data
              </h1>
            ) : (
              <h1 className="text-xl md:text-2xl font-bold flex max-xs:flex-col-reverse place-items-start">
                <div className="flex">
                  {recipe.vegetarian && (
                    <span className="relative w-7 h-7 pt-1 shrink-0">
                      <FaLeaf className="absolute fill-green-500" />
                    </span>
                  )}
                  {recipe.vegan && (
                    <span className="relative w-7 h-7 pt-1 shrink-0">
                      <FaLeaf className="absolute fill-green-500" />
                    </span>
                  )}
                </div>
                {recipe?.title}
              </h1>
            )}
            {saved ? (
              <BsHeartFill
                className={`fill-red-500 active:fill-slate-300 opacity-80 hover:opacity-100 w-7 h-7 mt-1 shrink-0 cursor-pointer transition-all`}
                onClick={() => toggleSaved()}
              />
            ) : (
              <BsHeart
                className={`opacity-80 hover:opacity-100 w-7 h-7 mt-1 shrink-0 cursor-pointer`}
                onClick={() => toggleSaved()}
              />
            )}
          </div>
          <div
            className={clsx([
              "relative h-screen-1/2 w-full aspect-square bg-coal-400 rounded-lg sm:shadow-md shrink-0 cursor-pointer",
              !recipe.imageUrl && "animate-pulse"
            ])}
          >
            {!!recipe.imageUrl && (
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill={true}
                className="w-full h-screen-1/2 object-cover rounded-lg"
              />
            )}
          </div>
          {loading ? (
            <h1 className="bg-coal-400 h-32 text-transparent rounded-lg w-full animate-pulse">
              No data
            </h1>
          ) : (
            <p className="text-lg">{recipe?.summary}</p>
          )}
          <div className="flex flex-col gap-2">
            <p className="flex whitespace-nowrap justify-between place-items-center gap-2 w-48">
              <span className="font-semibold"> Aktywny czas:</span>
              {loading ? (
                <span className="bg-coal-400 text-transparent rounded-lg w-14 animate-pulse">
                  Loading...
                </span>
              ) : (
                <span>{recipe?.cookTime.prep} minut</span>
              )}
            </p>
            <p className="flex whitespace-nowrap justify-between place-items-center gap-2 w-48">
              <span className="font-semibold"> Pasywny czas:</span>
              {loading ? (
                <span className="bg-coal-400 text-transparent rounded-lg w-14 animate-pulse">
                  Loading...
                </span>
              ) : (
                <span>{recipe?.cookTime.idle} minut</span>
              )}
            </p>
          </div>
        </section>
        <section>
          <div className="w-full relative">
            <h2 className="text-lg font-semibold py-4">Składniki do inteligentnych sugestii</h2>

            <ul className="flex flex-wrap gap-2">
              {loading ? (
                <span className="bg-coal-400 text-transparent h-16 rounded-lg w-full animate-pulse">
                  Loading...
                </span>
              ) : recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((x, key) => (
                  <RecipeIngredientView
                    removeIngredient={() => removeIngredient(key)}
                    ingredient={x}
                    key={key}
                  />
                ))
              ) : (
                <p className="opacity-80">Brak dodanych składników.</p>
              )}
            </ul>
          </div>
        </section>
        <QuillMarkUpParser instructions={recipe.recipeDetails.desc} />
      </section>
      <section
        id="admin-recipe-view-section"
        className="max-w-4xl bg-slate-500/30 mx-auto w-full max-sm:p-4 p-8 sm:rounded-xl sm:shadow-md shadow-black/40 flex flex-col gap-6"
        onSubmit={(e) => submitAction(e)}
      >
        <section id="review-section" className="relative">
          <div className="flex flex-col md:flex-row justify-between gap-16">
            <div className="w-fit shrink-0">
              <h2 className="text-xl font-semibold px-2 sm:px-4 py-4">Oceny</h2>
              <div className="flex flex-col gap-4">
                <span className="flex gap-4">
                  <Rating rating={5} /> 0 ocen
                </span>
                <span className="flex gap-4">
                  <Rating rating={4} /> 0 ocen
                </span>
                <span className="flex gap-4">
                  <Rating rating={3} /> 0 ocen
                </span>
                <span className="flex gap-4">
                  <Rating rating={2} /> 0 ocen
                </span>
                <span className="flex gap-4">
                  <Rating rating={1} /> 0 ocen
                </span>
              </div>
            </div>
            {
              // Extract to another component
            }
            <RatingSection />
          </div>
        </section>
        <section id="comment-section">
          <h2 className="text-xl font-semibold px-2 sm:px-4 py-4"> Komentarze </h2>
          <p className="opacity-80"> Brak dodanych komentarzy. </p>
        </section>
      </section>
    </RecipeContext.Provider>
  );
}

function RecipeIngredientView({
  ingredient,
  removeIngredient
}: {
  ingredient: IngredientType;
  removeIngredient: () => void;
}) {
  return (
    <li className="flex gap-2 place-items-center bg-slate-50/20 py-1 px-3 w-auto shrink-0 rounded-lg flex-nowrap">
      {ingredient.name}{" "}
    </li>
  );
}

function RatingSection() {
  const [review, setReview] = useState({
    text: "",
    rating: 0,
    userEmail: "unauthenticated@test.com"
  });

  function setText(value: string) {
    setReview({ ...review, text: value });
  }

  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="flex justify-between gap-2 pt-4 ">
        <h3 className="text-lg font-semibold">Oceń przepis</h3>
        <RatingActive starClassName="w-6 h-6 cursor-pointer" />
      </div>
      <TextArea
        inputClassName="!h-full"
        className="w-full max-w h-full"
        value={review?.text}
        onChange={setText}
        placeholder="Napisz co sądzisz o tym przepisie..."
      />
      <Button className="w-fit place-self-end bg-indigo-500">Wyślij</Button>
    </div>
  );
}
