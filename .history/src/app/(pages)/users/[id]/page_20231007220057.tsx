"use client"
import { PostItem } from "@/app/components/posts/post";
import GetAlbumsByUserId from "@/app/integration/jsonApi/getAlbumsByUserId";
import GetAlbumThumbnail from "@/app/integration/jsonApi/getAlbumThumbnail";
import GetPostsByUserId from "@/app/integration/jsonApi/getPostsByUserId";
import GetUser from "@/app/integration/jsonApi/getUser";
import { Album, Photo, Post, User } from "@/app/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaAngleUp, FaImage, FaUser } from "react-icons/fa";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>()
    const [albums, setAlbums] = useState<Album[]>([])
    const [posts, setPosts] = useState<Post[]>([])
    const [showAlbums, setShowAlbums] = useState(false)
    const [showPosts, setShowPosts] = useState(false)

    useEffect(() => {
        GetUser(data.id)
            .then(x => setUser(x))
        GetAlbumsByUserId(1, user?.id)
            .then(x => setAlbums(x.body))
        GetPostsByUserId(1, user?.id)
            .then(x => setPosts(x.body))
    }, [])
    

    return(
        <>
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full  rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex justify-between place-items-center p-6 md:p-8">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-600 flex justify-center place-items-center">
                    <FaUser className="w-full h-2/3"/>
                </div>
                <div className="flex flex-col place-items-end">
                    <span className="text-lg md:text-xl font-semibold">
                        {user?.name}
                    </span>
                    <span className="text-base md:text-lg opacity-80">
                        @{user?.username}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-6 md:p-8 bg-slate-500/20">
                <h1 className="text-xl font-bold">Contact Information</h1>
                <ul className="flex flex-col gap-4 text-base">
                    <li>
                        <h2 className="font-semibold">Email</h2>
                        <p className="lowercase opacity-70">{user?.email ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="font-semibold">Phone</h2>
                        <p className="opacity-70">{user?.phone ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="font-semibold">Company</h2>
                        <p className="opacity-70">{user?.company?.name ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="font-semibold">Website</h2>
                        <p className="lowercase opacity-70">{user?.website ?? "-"}</p>
                    </li>
                </ul>
            </div>
        </section>

        <section id="albums-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex flex-col gap-4 p-4 md:p-8 bg-slate-500/20">
                <h1 className="text-xl p-1 font-bold flex justify-between place-items-center">
                    Albums
                    <FaAngleUp className={`${showAlbums ? "" : "rotate-180"} w-8 h-8 cursor-pointer transition-all active:opacity-80`} onClick={() => setShowAlbums(x => !x)}/>
                </h1>
                {albums.length > 0 && showAlbums && 
                <ul className="grid pt-4 gap-4 grid-auto-fit-md">
                        {albums.map((x: Album, key: number) => <AlbumPanel album={x} key={key}/>)}
                </ul>}
            </div>
        </section>

        <section id="posts-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex flex-col gap-4 p-4 md:p-8 bg-slate-500/20">
                <h1 className="text-xl p-1 font-bold flex justify-between place-items-center">
                    Albums
                    <FaAngleUp className={`${showPosts ? "" : "rotate-180"} w-8 h-8 cursor-pointer transition-all active:opacity-80`} onClick={() => setShowPosts(x => !x)}/>
                </h1>
                {posts.length > 0 && showPosts && 
                <ul className="pt-4 flex flex-col gap-4">
                    {posts.map(x => <PostItem post={x}/>)}
                </ul>}
            </div>
        </section>
        </>
    )
}   

function AlbumPanel({album} : {album: Album}){
    const [photoUrl, setPhotoUrl] = useState<string>("")
    useEffect(() => {
      GetAlbumThumbnail(album.id)
        .then((x) => {
            setPhotoUrl(x.body[0].url)
        })
    }, [])
    
    return(
        <div className="h-72 rounded-lg overflow-hidden flex flex-col shadow-md bg-black shadow-black/20">
            <Link href={"/albums/" + album.id} className="h-full">
            <div className="h-full bg-black flex place-items-center justify-center relative">
                {photoUrl == "" ? <FaImage className="w-20 h-20 md:w-12 opacity-30 flex"/> : <Image layout="fill" objectFit="cover" src={photoUrl} alt="Album thumbnail"/>}
            </div>
            </Link>
            <div className="h-fit p-6 whitespace-nowrap hover:whitespace-normal">
                <Link href={"/albums/" + album.id}>
                    <h1 className="font-semibold overflow-ellipsis overflow-hidden capitalize-first cursor-pointer bg-clip-text hover:text-transparent bg-gradient-to-r from-vermilion-500 to-vermilion-400">
                        {album.title ?? "-"}
                    </h1>
                </Link>
            </div>
        </div>
    )
}