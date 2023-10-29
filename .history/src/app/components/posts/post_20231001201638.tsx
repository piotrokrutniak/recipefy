"use client";
import Image, { StaticImageData } from "next/image"
import { FaMugHot, FaCookieBite, FaHamburger, FaFireAlt, FaBookmark, FaRegBookmark, FaImage } from 'react-icons/fa'
import { useEffect, useState } from "react"
import Rating from "../generic/rating";
import Button from "../generic/button";
import { Post, User } from "@/app/types";
import GetUser from "@/app/integration/jsonApi/getUser";

export function PostItem({post}:{post: Post}){
      const [isSaved, setSaved] = useState(false)
      const [user, setUser] = useState<User|undefined>(undefined)
      useEffect(() => {
        GetUser(post.userId).then(x => setUser(x))
      }, [])
      
      return(
        <div className="w-full p-4 md:h-48 bg-black hover:bg-slate-500/20 rounded-lg shadow-md shadow-black/40 flex flex-col md:flex-row md:justify-between gap-8 items-center text-white group">
          <div className='h-80 w-full md:w-40 md:h-40 shrink-0 rounded-lg overflow-hidden relative cursor-pointer flex justify-center place-items-center bg-black'>
            {//<Image src={image} layout="fill" objectFit="cover" alt="Breakfast Photo"/>
            }
            <FaImage className="w-20 h-20 opacity-30 flex"/>
          </div>
          <div className="h-fit items-center">
            <div className="flex flex-col w-full justify-between gap-5 text-xl">
              <h1 className=" flex cursor-pointer bg-clip-text w-full capitalize overflow-ellipsis overflow-hidden hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                {post.title ?? "Post Title"}
              </h1>
              <div className="w-full flex-col">
                <h2 className="flex flex-row-reverse text-lg">{user?.name ?? "Guest"}</h2>
                <h2 className="flex flex-row-reverse opacity-60 font-thin text-base">@{user?.username ?? "Guest"}</h2>
              </div>
            </div>
            <div className="flex justify-between items-center pt-5 normal-case">
              <p className="text-white/60 capitalize-first">{post.body ?? "Description"}</p>
            </div>
            <div className="flex justify-between items-center pt-5">
              {
              //tags.map(x => <Button className="bg-slate-500/20 hover:bg-slate-500/40 text-sm font-thin py-1" onClick={undefined}>{x}</Button>)
              } 
              <Button className="bg-slate-700/40 hover:bg-vermilion-500/90 active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2"
                onClick={() => setSaved(x => !x)}> 
                {isSaved ? <>Saved <FaBookmark/></> : <>Save <FaRegBookmark/></>}
                </Button>
            </div>
          </div>          
        </div>
      )
  }