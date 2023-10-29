"use client";
import Image, { StaticImageData } from "next/image"
import Rating from "./rating"
import Button from "./button"
import { FaMugHot, FaCookieBite, FaHamburger, FaFireAlt, FaBookmark, FaRegBookmark } from 'react-icons/fa'
import { useState } from "react"

export function RecipeListing({rating = 0, title, desc, tags, image, saved,}: 
    {rating: number | undefined, title: string | undefined, desc: string | undefined, tags: string[], image: StaticImageData | string, saved: boolean }){
      const [isSaved, setSaved] = useState(saved)

      return(
        <div className="w-full p-4 md:h-48 bg-black hover:bg-slate-500/20 rounded-lg shadow-md shadow-black/40 flex flex-col md:flex-row md:justify-between gap-8 items-center text-white group">
          <div className='h-64 w-full md:w-40 md:h-40 shrink-0 rounded-lg overflow-hidden relative cursor-pointer'>
            <Image src={image} layout="fill" objectFit="cover" alt="Breakfast Photo"/>
          </div>
          <div className="h-fit w-full items-center">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl cursor-pointer bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">{title ?? "Recipe Name"}</h1>
              <Rating rating={rating}/>
            </div>
            <div className="flex justify-between items-center pt-5">
              <p className="text-white/60">{desc ?? "Description"}</p>
            </div>
            <div className="flex justify-between items-center pt-5">
              {tags.map(x => <Button className="bg-slate-500/20 hover:bg-slate-500/40 text-sm font-thin py-1" onClick={undefined}>{x}</Button>)} 
              <Button className="bg-slate-700/40 hover:bg-vermilion-500/90 active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2"
                onClick={() => setSaved(x => !x)}> 
                {isSaved ? <>Saved <FaBookmark/></> : <>Save <FaRegBookmark/></>}
                </Button>
            </div>
          </div>          
        </div>
      )
  }