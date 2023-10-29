"use client";
import Image from "next/image"
import { FaCommentAlt } from 'react-icons/fa'
import { useEffect, useState } from "react"
import { Comment, Photo, Post, User } from "@/app/types";
import GetUser from "@/app/integration/jsonApi/getUser";
import Link from "next/link";
import GetPostThumbnail from "@/app/integration/jsonApi/getPostThumbnail";
import GetCommentsByPostId from "@/app/integration/jsonApi/getPostComments";

export function PostItem({post}:{post: Post}){
      const [commentsOpen, setCommentsOpen] = useState(false)
      const [user, setUser] = useState<User|undefined>(undefined)
      const [selectedPhoto, setSelectedPhoto] = useState<Photo|undefined>()
      const [photos, setPhotos] = useState<Photo[]>([])
      
      useEffect(() => {
        GetUser(post.userId)
          .then(x => {setUser(x)})

        GetPostThumbnail(post.id)
          .then(x => {
              setPhotos([...x.body]);
              setSelectedPhoto(x.body[0])
          })
      }, [post])
      
      return(
        <div className="w-full p-4 bg-black hover:bg-slate-500/20 rounded-lg shadow-md shadow-black/40 flex flex-col md:flex-row md:justify-between gap-6 items-center text-white group transition-colors">
          <div className='w-full aspect-square active:opacity-80 md:w-80 lg:w-96 h-screen-1/3 md:h-80 shrink-0 rounded-lg overflow-hidden relative cursor-pointer flex justify-center place-items-center bg-black shadow-sm shadow-black/40'>
            <Link href={"/posts/" + post.id}>
              <Image layout="fill" objectFit="cover" src={selectedPhoto?.url ?? ""} alt="Album thumbnail" className="aspect-square h-full"/>
            </Link>
          </div>
          <div className="h-fit items-center">
            <div className="flex flex-col xs:flex-row w-full justify-between text-xl gap-2 xs:gap-5">
              <h1 className="flex place-items-start cursor-pointer w-full capitalize text-lg lg:text-xl active:opacity-80
                overflow-ellipsis overflow-hidden bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                <Link href={"/posts/" + post.id}>
                  {post.title ?? "Post Title"}
                </Link>
              </h1>
              <div className="flex flex-row-reverse">
                <div className="w-fit flex-col opacity-80 hover:opacity-100 cursor-pointer bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                <Link href={"/users/" + user?.id} className="active:opacity-80">
                  <h2 className="flex flex-row-reverse text-base lg:text-lg whitespace-nowrap">{user?.name ?? "Guest"}</h2>
                  <h2 className="flex flex-row-reverse font-light text-sm sm:text-base">@{user?.username ?? "Guest"}</h2>
                </Link>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center pt-5 normal-case">
                <p className="text-white/60 text-base lg:text-lg capitalize-first">{post.body ?? "Description"}</p>
            </div>
            <div className="flex relative flex-row-reverse items-center pt-5">
              <div className="flex place-items-center gap-2 cursor-pointer hover:text-vermilion-400 active:opacity-80 select-none" 
                onClick={() => setCommentsOpen(x => !x)}>
                Comments<FaCommentAlt className="mt-1"/>
              </div>
              {commentsOpen && 
              <div className="w-full absolute top-full h-96 overflow-clip rounded-lg mt-2 bg-black z-20 shadow-md shadow-black/40">
                <CommentsSection post={post}/>
              </div>}
            </div>
          </div>          
        </div>
      )
  }

  function CommentsSection({post}:{post: Post}){
    const [postComments, setPostComments] = useState<Comment[]>([])

    useEffect(() => {
      GetCommentsByPostId(1, post.id)
        .then(x => setPostComments(x.body))
    }, [])
    
    return(
      <div className="bg-slate-500/30 w-full h-full">
        <div className="p-4 mb-2 border-b-2 border-slate-400/20 shadow-sm shadow-black/40 w-full flex justify-between">
          <span className="font-semibold">Comments</span>
        </div>
      </div>
    )
  }
