"use client";
import Button from "@/app/components/generic/button";
import FormInput from "@/app/components/generic/formInput";
import { RecipeType } from "@/app/types";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave, FaSpinner } from "react-icons/fa";
import TextArea from "@/app/components/generic/textArea";

export default function AddRecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<RecipeType>({
    title: "",
    summary: "",
    cookTime: {
      prep: 0,
      idle: 0
    },
    recipeDetails: {
      _id: params.id,
      desc: "<h2>Składniki</h2><ul><li> </li><li> </li></ul><h2>Instrukcje</h2><p>Instrukcje tutaj</p>",
      recipeId: params.id
    },
    rating: 0,
    thumbnailUrl: "",
    imageUrl: "",
    ingredients: []
  });

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setValidated(recipe.title.length > 0 && recipe.summary.length > 0);
  }, [recipe]);

  async function postRecipe() {
    const baseUrl = window.location.origin;
    const result: { data: { recipe: RecipeType } } = await axios.post(
      `${baseUrl}/api/recipes/`,
      recipe
    );

    return result.data;
  }

  function setSummary(value: string) {
    if (recipe) {
      setRecipe({ ...recipe, summary: value });
    }
  }
  function setTitle(value: string) {
    if (recipe) {
      setRecipe({ ...recipe, title: value });
    }
  }

  function submitAction(e: FormEvent) {
    e.preventDefault();
    setError(undefined);
    setLoading(true);
    if (validated) {
      postRecipe()
        .then((x) => {
          console.log(x);
          setLoading(false);
          router.push("/admin/recipes/edit/" + x.recipe._id);
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
          setLoading(false);
        });
    }
  }

  return (
    <>
      <form
        id="admin-recipe-view-section"
        className="max-w-4xl bg-slate-500/30 mx-auto w-full max-mobile:p-4 p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-6"
        onSubmit={(e) => submitAction(e)}
      >
        <div className="flex flex-col sm:flex-row justify-between sm:place-items-start gap-4">
          <h1 className="text-2xl font-semibold">Add New Recipe</h1>
        </div>
        <FormInput
          className="w-full max-w"
          onChange={setTitle}
          value={recipe?.title}
          placeholder="Start typing..."
          label="Title"
        />
        <TextArea
          className="w-full max-w"
          onChange={setSummary}
          value={recipe?.summary}
          placeholder="Start typing..."
          label="Summary"
        />
        <div className="flex flex-col gap-2 justify-end place-items-end">
          <span className="text-red-500"> {error} </span>
          <Button disabled={!validated} type="submit" className="flex gap-2 place-items-center">
            {" "}
            {loading ? (
              <FaSpinner className="w-5 h-5 animate-spin" />
            ) : (
              <FaSave className="w-5 h-5" />
            )}{" "}
            Create{" "}
          </Button>
        </div>
      </form>
    </>
  );
}
