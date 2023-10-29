"use client"
import { UserPanel } from "@/app/components/generic/userPanel";
import CommentsSection from "@/app/components/posts/commentSection";
import GetAlbumById from "@/app/integration/jsonApi/getAlbumById";
import GetAlbumPhotos from "@/app/integration/jsonApi/getAlbumPhotos";
import GetPostById from "@/app/integration/jsonApi/getPostById";
import GetUser from "@/app/integration/jsonApi/getUser";
import { Album, Photo, Post, User } from "@/app/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaImage, FaUser } from "react-icons/fa";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>();
    const [post, setPost] = useState<Post>()
    const [selectedPhoto, setSelectedPhoto] = useState<Photo>()
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
            <UserPanel user={user}/>
            <div id="photo-section" className="w-full h-full sm:h-screen-1/2 flex aspect-square place-items-center justify-center relative">
                {selectedPhoto?.url == ""  && selectedPhoto ? <FaImage className="w-20 h-20 md:w-12 opacity-30 flex"/> : <Image layout="fill" objectFit="contain" src={selectedPhoto?.url ?? ""} alt="Album thumbnail" className="aspect-square h-full"/>}
            </div>
            <div className="p-4 md:p-8 flex flex-col gap-4">
                <p className="capitalize-first font-bold">{post?.title}</p>
                <p className="opacity-70">{post?.body}</p>
            </div>
            {post && <CommentsSection post={post}/>}
        </section>
    )
}   