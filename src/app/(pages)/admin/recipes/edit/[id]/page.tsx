"use client";
import Button from "@/app/components/generic/button";
import FormInput from "@/app/components/generic/formInput";
import { IngredientType, RecipeType } from "@/app/types";
import { FormEvent, useEffect, useState } from "react";
import { FaEye, FaSave, FaSpinner } from "react-icons/fa";
import TextArea from "@/app/components/generic/textArea";
import { BsX } from "react-icons/bs";
import { GetDateTime, ParseDate, ParseDateTime } from "@/app/utilities/globalMethods";
import {
  RecipeContext,
  useRecipeContext
} from "@/app/components/functionalities/recipes/recipeContext";
import { patchRecipe } from "@/app/utilities/axios/recipes/patchRecipe";
import { getRecipe } from "@/app/utilities/axios/recipes/getRecipe";
import { AddIngredient } from "@/app/components/functionalities/recipes/addRecipeIngredient";
import { putRecipeDetails } from "@/app/utilities/axios/recipes/details/putDetails";
import { getRecipeDetails } from "@/app/utilities/axios/recipes/details/getDetails";
import Link from "next/link";
import axios from "axios";
import { QuillEditor } from "@/app/components/generic/quill/QuillEditor";
import { PublishedToggle } from "../../page";
import clsx from "clsx";

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
      desc: "",
      recipeId: params.id
    },
    rating: 0,
    thumbnailUrl: "",
    imageUrl: "",
    ingredients: [],
    published: false,
  });

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const numRegex: RegExp = new RegExp("d*$");

  useEffect(() => {
    console.log("published", recipe.published)
  }, [recipe.published]);

  useEffect(() => {
    setValidated(recipe.title.length > 0 && recipe.summary.length > 0);
    getRecipe(params.id)
      .then((x) => {
        return {
          ...x.recipe,
          recipeDetails: recipe.recipeDetails
        };
      })
      .then((tempRecipe) => {
        getRecipeDetails(params.id).then((x) => {
          tempRecipe.recipeDetails = x.recipeDetails ?? {
            ...tempRecipe.recipeDetails,
            desc: "<p></p>"
          };
          setRecipe({ ...tempRecipe });
        });
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setValidated(recipe.title.length > 0 && recipe.summary.length > 0);
  }, [recipe]);

  useEffect(() => {
    setValidated(recipe.title.length > 0 && recipe.summary.length > 0);
  }, [loading, recipe.summary.length, recipe.title.length]);

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

  function setIdle(value: string) {
    if (recipe && value.match(numRegex)) {
      setRecipe({ ...recipe, cookTime: { ...recipe.cookTime, idle: parseInt(value || "0") } });
    }
  }

  function setPrep(value: string) {
    if (recipe && value.match(numRegex)) {
      setRecipe({ ...recipe, cookTime: { ...recipe.cookTime, prep: parseInt(value || "0") } });
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

  function togglePublished(value: boolean) {
    setRecipe({ ...recipe, published: value });
  }

  return (
    <>
      <RecipeContext.Provider value={{ recipe: recipe, setRecipe: setRecipe }}>
        <form
          id="admin-recipe-view-section"
          className="max-w-4xl bg-slate-500/30 mx-auto w-full max-sm:p-4 p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-6"
          onSubmit={(e) => submitAction(e)}
        >
          <div className="flex flex-col sm:flex-row justify-between sm:place-items-start gap-4">
            {
              // TODO: Add toggle for updated and created date section on mobile
            }
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl flex font-semibold place-items-center gap-4">
                Edit Recipe
                <Link href={"/admin/recipes/view/" + params.id} className="w-fit">
                  <Button className="text-base !p-2 font-normal">
                    {" "}
                    <FaEye /> Preview
                  </Button>
                </Link>
              </h1>
              <h2 className="opacity-70 ">{params.id}</h2>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="font-semibold">Published:</span>
                <div className="w-[48px] flex place-self-end mb-1">
                  <SimpleToggle initialValue={recipe?.published ?? false} updateMethod={togglePublished} />
                </div>
              </div>
              <p className="flex whitespace-nowrap justify-between sm:ml-auto mr-0 place-items-center gap-2 w-44">
                {" "}
                <span className="font-semibold">Updated:</span>{" "}
                {recipe?.updatedAt ? ParseDate(recipe?.updatedAt) : "Unknown"}{" "}
              </p>
              <p className="flex whitespace-nowrap justify-between sm:ml-auto mr-0 place-items-center gap-2 w-44">
                {" "}
                <span className="font-semibold">Created:</span>{" "}
                {recipe?.createdAt ? ParseDate(recipe?.createdAt) : "Unknown"}{" "}
              </p>
            </div>
          </div>
          <FormInput
            className="w-full max-w"
            onChange={setTitle}
            value={recipe?.title}
            placeholder="Start typing..."
            label="Title"
          />
          <div 
            className="w-full h-screen-1/3 bg-gray-200 cursor-pointer rounded-lg flex justify-center items-center"
            onClick={() => document.getElementById('imageUpload')?.click()}
            style={{ backgroundImage: `url(${recipe?.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {!recipe?.imageUrl && <p>Select Image</p>}
            <input 
              type="file" 
              id="imageUpload" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadImageToCloudinary(file)
                    .then((imageUrl) => {
                      setRecipe({ ...recipe, imageUrl: imageUrl });
                    })
                    .catch((error) => {
                      console.error("Upload failed", error);
                    });
                }
              }}
            />
          </div>
          <TextArea
            className="w-full max-w"
            onChange={setSummary}
            value={recipe?.summary}
            placeholder="Start typing..."
            label="Summary"
          />
          <div className="flex flex-col gap-2">
            <p className="flex whitespace-nowrap justify-between place-items-center gap-2 w-64">
              <span className="font-semibold"> Prep Time:</span>
              <div className="flex place-items-center gap-2">
                <FormInput
                  value={recipe.cookTime?.prep.toString() || "0"}
                  onChange={setPrep}
                  inputClassName="!w-16 text-center"
                />{" "}
                minutes
              </div>
            </p>
            <p className="flex whitespace-nowrap justify-between place-items-center gap-2 w-64">
              <span className="font-semibold"> Idle Time:</span>
              <div className="flex place-items-center gap-2">
                <FormInput
                  value={recipe.cookTime?.idle.toString() || "0"}
                  onChange={setIdle}
                  inputClassName="!w-16 text-center"
                />{" "}
                minutes
              </div>
            </p>
          </div>
          <div className="w-full relative">
            <h2 className="text-xl font-semibold px-2 sm:px-4 py-4">Ingredients</h2>
            <ul className="flex flex-wrap gap-2">
              {recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((x, key) => (
                  <RecipeIngredient
                    removeIngredient={() => removeIngredient(key)}
                    ingredient={x}
                    key={key}
                  />
                ))
              ) : (
                <p className="opacity-80">No ingredients added yet.</p>
              )}
            </ul>
            <AddIngredient id={params.id} setIngredients={setRecipe} />
          </div>
          <InstructionsEditor />

          <div className="flex justify-between place-items-center mt-4">
            {recipe?.updatedAt && (
              <div id="saved-status" className="opacity-70">
                {" "}
                Last saved at: {ParseDateTime(recipe?.updatedAt)}
              </div>
            )}
            <Button 
              type="submit"
              disabled={!validated} 
              className="flex flex-end gap-2 place-items-center"
            >
              {loading ? (
                <>
                  <FaSpinner className="w-5 h-5 animate-spin" /> Saving{" "}
                </>
              ) : (
                <>
                  <FaSave className="w-5 h-5" /> Save{" "}
                </>
              )}
            </Button>
          </div>
        </form>
      </RecipeContext.Provider>
    </>
  );
}

function InstructionsEditor() {
  const { recipe, setRecipe } = useRecipeContext();

  function setDesc(value: string) {
    if (recipe) {
      setRecipe({ ...recipe, recipeDetails: { ...recipe.recipeDetails, desc: value } });
    }
  }

  return (
    recipe.recipeDetails.desc && (
      <QuillEditor state={recipe.recipeDetails.desc} setState={setDesc} />
    )
  );
}

function RecipeIngredient({
  ingredient,
  removeIngredient
}: {
  ingredient: IngredientType;
  removeIngredient: () => void;
}) {
  return (
    <li className="flex gap-2 place-items-center bg-slate-50/20 py-1 px-3 w-auto shrink-0 rounded-lg flex-nowrap">
      {ingredient.name}{" "}
      <BsX
        className="h-8 w-8 shrink-0 cursor-pointer active:opacity-70 hover:fill-red-500"
        onClick={removeIngredient}
      />
    </li>
  );
}

async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "default"); // Replace 'default' with your Cloudinary upload preset

  try {
    const response = await axios.post("https://api.cloudinary.com/v1_1/recipefy/image/upload", formData); // Replace 'recipefy' with your Cloudinary cloud name
    return response.data.url; // This is the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    throw new Error("Failed to upload image");
  }
}

export const SimpleToggle = ({ initialValue, updateMethod }: { initialValue: boolean, updateMethod: (value: boolean) => void }) => {
  const [value, setValue] = useState<boolean | undefined>(undefined);
  const handleToggle = () => {
    const newValue = !value;
    setValue(newValue);
    updateMethod(newValue);
  };  
  
  return (
    <button onClick={handleToggle} className="bg-slate-700 w-full max-w-[48px] p-2 rounded-lg relative text-white">
      <div className={clsx([
        "w-6 h-6 rounded-full absolute transition-transform duration-300 ease-in-out -top-[4px]",
        value ?? initialValue ? "bg-indigo-500 right-0" : "bg-slate-400 left-0",
      ])} />
    </button>
  );
};