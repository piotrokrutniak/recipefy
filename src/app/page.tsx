import React, { useEffect, useState } from "react";
import { RecipeType } from "./types";
import { GetRecipes } from "./utilities/axios/recipes/getRecipes";
import { TopPicks } from "./components/home/TopPicks";
import SearchBar from "./components/generic/searchBar";

export default function Home() {
  return (
    <>
      <section
        id="top-picks-section"
        className="max-w-7xl bg-black/90 mx-auto w-full md:p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-4"
      >
        <SearchBar/>
      </section>
      <section
        id="top-picks-section"
        className="max-w-7xl bg-black/90 mx-auto w-full md:p-8 rounded-xl shadow-md shadow-black/40 flex flex-col gap-4"
      >
        <TopPicks />
        <h1 className="text-2xl font-bold text-white">
          Najnowsze Przepisy
        </h1>
      </section>
      
    </>
  );
}



