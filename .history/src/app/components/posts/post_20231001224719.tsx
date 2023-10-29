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
        <div className="w-full p-4 bg-black hover:bg-slate-500/20 rounded-lg shadow-md overflow-clip shadow-black/40 flex flex-col lg:flex-row md:justify-between gap-4 items-center text-white group transition-colors">
          <div className='lg:h-full w-full aspect-square lg:w-40 h-80 shrink-0 rounded-lg overflow-hidden relative cursor-pointer flex justify-center place-items-center bg-black shadow-sm shadow-black/40'>
            {//<Image src={image} layout="fill" objectFit="cover" alt="Breakfast Photo"/>
            }
            <FaImage className="w-20 h-20 md:w-12 opacity-30 flex"/>
          </div>
          <div className="h-fit items-center p-2">
            <div className="flex flex-col lg:flex-row w-full justify-between text-xl gap-2 lg:gap-5">
              <h1 className="flex place-items-center cursor-pointer bg-clip-text w-full capitalize
                overflow-ellipsis overflow-hidden hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                {post.title ?? "Post Title"}
              </h1>
              <div className="flex flex-row-reverse">
                <div className="w-fit flex-col opacity-80 hover:opacity-100 cursor-pointer bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                  <h2 className="flex flex-row-reverse text-lg whitespace-nowrap">{user?.name ?? "Guest"}</h2>
                  <h2 className="flex flex-row-reverse font-light text-base">@{user?.username ?? "Guest"}</h2>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-5 normal-case">
              <p className="text-white/60 text-lg capitalize-first">{post.body ?? "Description"}</p>
            </div>
            <div className="flex justify-between items-center pt-5">
              {
              //tags.map(x => <Button className="bg-slate-500/20 hover:bg-slate-500/40 text-sm font-thin py-1" onClick={undefined}>{x}</Button>)
              } 
            </div>
          </div>          
        </div>
      )
  }