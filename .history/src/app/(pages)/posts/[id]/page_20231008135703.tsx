"use client"
import GetAlbumById from "@/app/integration/jsonApi/getAlbumById";
import GetAlbumPhotos from "@/app/integration/jsonApi/getAlbumPhotos";
import GetPostById from "@/app/integration/jsonApi/getPostById";
import GetUser from "@/app/integration/jsonApi/getUser";
import { Album, Photo, Post, User } from "@/app/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>();
    const [post, setPost] = useState<Post>()
    const [selectedPhoto, setSelectedPhoto] = useState<Photo|undefined>()
    const [photos, setPhotos] = useState<Photo[]>([])

    useEffect(() => {
        GetPostById(data.id)
            .then((x) => {
                setPost(x.body);
                return x.body;
            })
            .then(x => {
                GetUser(x.userId)
                    .then(x => setUser(x));
                return x;
            })
            .then(x => GetAlbumPhotos(x.id, 1)
                .then(x => {
                    setPhotos([...x.body]);
                    setSelectedPhoto(x.body[0])
                    }
            ))
    }, [])
    

    return(
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden bg-black/90 mx-auto w-full rounded-xl shadow-md shadow-black/40 text-white'>
            <div id="user-info" className="flex max-sm:justify-between flex-row-reverse gap-5 p-2 2xs:p-4 place-items-center group">
                <Link href={"/users/" + user?.id}>
                <div className="flex flex-col place-items-end group-hover:text-vermilion-400">
                    <span className="text:xl md:text-lg whitespace-nowrap font-semibold">
                        {user?.name}
                    </span>
                    <span className="text-sm md:text-base opacity-80">
                        @{user?.username ?? "guest"}
                    </span>
                </div>
                </Link>
                <Link href={"/users/" + user?.id}>
                    <div className="w-10 h-10 rounded-full bg-slate-600 flex justify-center place-items-center">
                            <FaUser className="w-full h-2/3"/>
                    </div>
                </Link>
            </div>
            <div id="photo-section" className="w-full h-full sm:h-screen-2/3 aspect-square relative">
                <Image layout="fill" objectFit="contain" src={selectedPhoto?.url ?? ""} alt="Album thumbnail" className="aspect-square h-full"/>
            </div>
            <div className="p-4 flex flex-col gap-4">
                <p className="capitalize-first font-bold">{post?.title}</p>
                <p className="opacity-70">{post?.body}</p>
            </div>
        </section>
    )
}   