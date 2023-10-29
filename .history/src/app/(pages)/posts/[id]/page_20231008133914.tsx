"use client"
import GetAlbumById from "@/app/integration/jsonApi/getAlbumById";
import GetAlbumPhotos from "@/app/integration/jsonApi/getAlbumPhotos";
import GetUser from "@/app/integration/jsonApi/getUser";
import { Album, Photo, User } from "@/app/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>();
    const [album, setAlbum] = useState<Album>()
    const [selectedPhoto, setSelectedPhoto] = useState<Photo|undefined>()
    const [photos, setPhotos] = useState<Photo[]>([])

    useEffect(() => {
        GetAlbumById(data.id)
            .then((x) => {
                setAlbum(x.body);
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
            <div id="user-info" className="flex max-xs:justify-between flex-row-reverse gap-5 p-2 2xs:p-4 place-items-center">
                <Link href={"/users/" + user?.id}>
                <div className="flex flex-col place-items-end">
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
            <div id="photo-section" className="w-full h-full sm:h-screen-1/2 aspect-square relative">
                <Image layout="fill" objectFit="contain" src={selectedPhoto?.url ?? ""} alt="Album thumbnail" className="aspect-square h-full"/>
            </div>

        </section>
    )
}   