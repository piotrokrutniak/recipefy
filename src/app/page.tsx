import React from "react";
import { TopPicks } from "./components/home/TopPicks";
import SearchBar from "./components/generic/searchBar";
import { FaFireAlt } from "react-icons/fa";

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
        <h1 className="text-2xl font-bold flex gap-2 text-white place-items-center">
          <FaFireAlt className="fill-current text-vermilion-400" /> Najnowsze Przepisy
        </h1>
        <TopPicks />
      </section>
      
    </>
  );
}



