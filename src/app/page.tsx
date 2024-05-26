import React from "react";
import { TopPicks } from "./components/home/TopPicks";
import SearchBar from "./components/generic/searchBar";
import { FaFireAlt } from "react-icons/fa";
import Link from "next/link";
import Button from "./components/generic/button";
import LinkButton from "./components/generic/LinkButton";

export default function Home() {
  return (
    <>
      <section
        id="top-picks-section"
        className="max-w-7xl bg-black/90 mx-auto w-full md:p-8 sm:rounded-xl shadow-md shadow-black/40 flex flex-col gap-4 p-2"
      >
        <SearchBar />
      </section>
      <section
        id="top-picks-section"
        className="max-w-7xl bg-black/90 mx-auto w-full md:p-8 sm:rounded-xl shadow-md shadow-black/40 flex flex-col gap-4 p-2"
      >
        <h1 className="flex gap-2 justify-between text-white place-items-center">
          <p className="text-2xl font-bold flex gap-2">
            <FaFireAlt className="fill-current text-vermilion-400" /> Najnowsze Przepisy
          </p>
          <LinkButton
            href={"/recipes"}
            className="text-white bg-transparent border-2 border-slate-200/20 hover:border-transparent active:bg-slate-100/5 hover:bg-indigo-500"
          >
            Przepisy
          </LinkButton>
        </h1>
        <TopPicks />
      </section>
    </>
  );
}
