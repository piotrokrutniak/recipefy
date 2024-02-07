"use client";
import Button from "@/app/components/generic/button";
import FormCheckbox from "@/app/components/generic/formCheckbox";
import FormInput from "@/app/components/generic/formInput";
import { IngredientType } from "@/app/types";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave } from "react-icons/fa";

export default function ViewIngredientPage({
  params,
}: {
  params: { id: string };
}) {
  const [ingredient, setIngredient] = useState<IngredientType>({
    name: "",
    vegan: false,
    vegetarian: false
  });
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setValidated(ingredient.name.length > 0);
  }, [ingredient]);

  async function postIngredient() {
    const baseUrl = window.location.origin;
    const result: { data: { ingredient: IngredientType } } = await axios.post(
      `${baseUrl}/api/ingredients/`,
      ingredient
    );

    return result.data;
  }

  function setVegan(value: boolean) {
    if (ingredient) {
      setIngredient({ ...ingredient, vegan: value });
    }
  }
  function setName(value: string) {
    if (ingredient) {
      setIngredient({ ...ingredient, name: value });
    }
  }

  function setVegetarian(value: boolean) {
    if (ingredient) {
      setIngredient({ ...ingredient, vegetarian: value });
    }
  }

  function submitAction(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (validated) {
      postIngredient()
        .then((x) => {
          console.log(x);
          setLoading(false);
          router.push("/admin/ingredients/view/" + x.ingredient._id);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }

  //TODO: Display recipes containing this ingredient

  return (
    <>
      <form
        id="admin-ingredient-view-section"
        className="max-w-4xl bg-slate-500/30 mx-auto w-full max-mobile:p-4 p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-6"
        onSubmit={(e) => submitAction(e)}
      >
        <div className="flex flex-col sm:flex-row justify-between sm:place-items-start gap-4">
          <h1 className="text-2xl font-semibold">Add New Ingredient</h1>
          <div className="flex flex-col gap-2">
            <h2 className="opacity-70">{params.id}</h2>
            <p className="flex whitespace-nowrap place-items-center gap-2">
              {" "}
              <span className="font-semibold">Updated:</span>{" "}
              {/*ingredient?.updated ??*/ "Missing data"}{" "}
            </p>
            <p className="flex whitespace-nowrap place-items-center gap-2">
              {" "}
              <span className="font-semibold">Created:</span>{" "}
              {/*ingredient?.created ??*/ "Missing data"}{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between sm:place-items-center gap-4">
          <FormInput
            onChange={setName}
            value={ingredient?.name}
            placeholder="Enter ingredient name"
            label="Ingredient Name"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex flex-col gap-6 w-36">
            <div className="flex justify-between place-items-center gap-4 pl-2">
              {" "}
              Vegan{" "}
              <FormCheckbox
                value={ingredient?.vegan || false}
                updateValue={setVegan}
                defaultValue={ingredient?.vegan}
              />{" "}
            </div>
            <div className="flex justify-between place-items-center gap-4 pl-2">
              {" "}
              Vegetarian{" "}
              <FormCheckbox
                value={ingredient?.vegetarian || false}
                updateValue={setVegetarian}
                defaultValue={ingredient?.vegetarian}
              />{" "}
            </div>
          </div>
        </div>
        <div className="flex justify-end place-items-center mt-4">
          <Button disabled={!validated} type="submit" className="flex gap-2 place-items-center">
            <FaSave className="w-5 h-5" /> Add
          </Button>
        </div>
      </form>
    </>
  );
}
