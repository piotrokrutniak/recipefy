import Rating from "@/app/components/generic/rating";
import { RecipeType } from "@/app/types";
import Link from "next/link";
import { useRef, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Cookies } from "react-cookie";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { FaLink, FaFish, FaBan, FaEgg } from "react-icons/fa";

export default function RecipeListItem({ recipe, favRecipes, setFavRecipes }:
    {
        recipe: RecipeType;
        favRecipes: string[];
        setFavRecipes: Dispatch<SetStateAction<string[]>>;
        //cookies: Cookies;
    }){
    const ref = useRef<any>(null)
    const buttonRef = useRef<any>(null)
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

    const [saved, setSaved] = useState<boolean>(favRecipes.findIndex(x => x == recipe._id) > -1)

    useEffect(() => {
        function handleClickOutside(event: any) {
          if (ref.current && !ref.current.contains(event.target)) {
            setDropdownOpen(false)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    function toggleSaved(){
        if(recipe._id){
            const index = favRecipes.findIndex(x => x == recipe._id)
            const temp = favRecipes;
            if(index > -1){
                setSaved(false)
                console.log("removed " + recipe._id);
                temp.splice(index, 1)

                setFavRecipes([...temp])
            }
            else {
                setSaved(true);
                console.log("added " + recipe._id);
                temp.push(recipe._id);
                setFavRecipes([...temp])
            }
        }
    }

    return(
        <li className="w-full md:h-56 border-2 border-coal-400 hover:bg-slate-400/10 shadow-lg rounded-lg flex flex-col md:flex-row gap-3 md:gap-6 p-2 sm:p-4">
            <div className="md:h-full h-screen-1/3 w-auto aspect-square bg-white/20 rounded-lg shadow-md shrink-0 cursor-pointer">
                
            </div>
            <div className="flex flex-col justify-between gap-3 sm:pt-4 overflow-hidden">
                <div className="flex flex-col gap-2 md:gap-4 h-max overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between md:place-items-center gap-1 md:gap-4 w-full">
                        <Link href={"/recipes/" + recipe._id} className="shrink-1 truncate flex place-items-center w-full gap-2 hover:text-indigo-400 transition-all duration-75">
                            <h1 className="text-xl md:text-2xl font-semibold cursor-pointer truncate">
                                {recipe.title} 
                            </h1>
                            <FaLink className="w-4 h-4 shrink-0"/> 
                        </Link>
                        <Rating starClassName="h-5" className="w-fit" rating={recipe.rating}/>
                    </div>
                    <p className="lg:text-lg h-full line-clamp-5 md:line-clamp-3">{recipe.summary}</p>
                </div>
                <div className="flex justify-between place-items-center">
                    <div className="flex relative gap-2">
                        {recipe.vegetarian && <span className="relative w-7 h-7 shrink-0 text-3xl"><FaFish className="absolute p-1"/> <FaBan className="absolute fill-red-500"/> </span>}
                        {recipe.vegan && <span className="relative w-7 h-7 shrink-0 text-3xl"><FaEgg className="absolute p-1"/> <FaBan className="absolute fill-red-500"/> </span>}
                    </div>
                    {saved ? 
                        <BsHeartFill className={`fill-red-500 active:fill-slate-300 opacity-80 hover:opacity-100 w-7 h-7 mt-1 shrink-0 cursor-pointer transition-all`}
                            onClick={() => toggleSaved()}/> :
                        <BsHeart className={`opacity-80 hover:opacity-100 w-7 h-7 mt-1 shrink-0 cursor-pointer`}
                            onClick={() => toggleSaved()}/>
                    }
                </div>
            </div>
        </li>
    )
}