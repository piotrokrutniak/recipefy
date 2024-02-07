"use client";
import { RecipeType } from "@/app/types";
import { GetRecipes } from "@/app/utilities/axios/recipes/getRecipes";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "../generic/button";
import { useRouter } from "next/navigation";


export const TopPicks = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const router = useRouter();

  useEffect(() => {
    GetRecipes(1).then((data) => {
      setRecipes(data.recipes.slice(0, 3));
    });
  }, []);

  return (
    <div className="text-white rounded-lg overflow-clip">
      {recipes.length &&
      <Carousel className="w-full h-screen-2/3" autoPlay infiniteLoop showThumbs={false}>
        {recipes.map((recipe) => (
          <div key={recipe._id} className="relative w-full h-screen-2/3">
            <Image 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              width={1280} 
              height={1280} 
              className="w-full h-full object-cover rounded-lg opacity-60"
            />
            <div className="absolute bottom-0 left-0 w-full h-fit p-8 flex flex-col justify-end gap-4">
              <p className="flex text-4xl font-bold">{recipe.title}</p>
              <p className="flex text-2xl text-start opacity-80">{recipe.summary.trim()}</p>
              <Button
                onClick={() => {
                  router.push(`/recipes/${recipe._id}`);
                }}
                className="w-fit p-4"
              >
                View Recipe
              </Button>
            </div>
          </div>
        ))}
      </Carousel>}
    </div>
  );
};

