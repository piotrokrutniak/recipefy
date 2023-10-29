"use client";
import Image, { StaticImageData } from "next/image"
import { FaMugHot, FaCookieBite, FaHamburger, FaFireAlt, FaBookmark, FaRegBookmark, FaImage } from 'react-icons/fa'
import { useEffect, useState } from "react"
import Rating from "../generic/rating";
import Button from "../generic/button";
import { Post, User } from "@/app/types";
import GetUser from "@/app/integration/jsonApi/getUser";
import Link from "next/link";

export function PostItem({post}:{post: Post}){
      const [isSaved, setSaved] = useState(false)
      const [user, setUser] = useState<User|undefined>(undefined)

      useEffect(() => {
        GetUser(post.userId).then(x => {setUser(x); console.log(x)})
      }, [post])
      
      return(
        <div className="w-full p-4 bg-black hover:bg-slate-500/20 rounded-lg shadow-md overflow-clip shadow-black/40 flex flex-col lg:flex-row md:justify-between gap-4 items-center text-white group transition-colors">
          <div className='w-full aspect-square active:opacity-80 lg:w-96 h-80 shrink-0 rounded-lg overflow-hidden relative cursor-pointer flex justify-center place-items-center bg-black shadow-sm shadow-black/40'>
            <Link href={"/posts/" + post.id}>
              <FaImage className="w-20 h-20 md:w-12 opacity-30 flex"/>
            </Link>
          </div>
          <div className="h-fit items-center p-2">
            <div className="flex flex-col lg:flex-row w-full justify-between text-xl gap-2 lg:gap-5">
              <h1 className="flex place-items-center cursor-pointer w-full capitalize text-lg sm:text-xl active:opacity-80 border-b-2 border-sky-50/70 pb-2
                overflow-ellipsis overflow-hidden bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                <Link href={"/posts/" + post.id}>
                  {post.title ?? "Post Title"}
                </Link>
              </h1>
              <div className="flex flex-row-reverse">
                <div className="w-fit flex-col opacity-80 hover:opacity-100 cursor-pointer bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                <Link href={"/users/" + user?.id} className="active:opacity-80">
                  <h2 className="flex flex-row-reverse text-base sm:text-lg whitespace-nowrap">{user?.name ?? "Guest"}</h2>
                  <h2 className="flex flex-row-reverse font-light text-sm sm:text-base">@{user?.username ?? "Guest"}</h2>
                </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-5 normal-case">
                <p className="text-white/60 text-base sm:text-lg capitalize-first">{post.body ?? "Description"}</p>
            </div>
            <div className="flex justify-between items-center pt-5">
            </div>
          </div>          
        </div>
      )
  }