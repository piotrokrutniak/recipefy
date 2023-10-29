"use client"
import GetAlbumById from "@/app/integration/jsonApi/getAlbumById"
import GetAlbumPhotos from "@/app/integration/jsonApi/getAlbumPhotos"
import GetAlbumsByUserId from "@/app/integration/jsonApi/getAlbumsByUserId"
import GetUser from "@/app/integration/jsonApi/getUser"
import { Album, Photo, User } from "@/app/types"
import { useEffect, useState } from "react"
import { FaUser, FaImages } from "react-icons/fa"

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>()
    const [album, setAlbum] = useState<Album>()

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
                .then(x => setPhotos([...x.body])))

    //   GetUser(data.id)
    //     .then(x => setUser(x))
    //     .then(() => GetAlbumsByUserId(1, user?.id))
    //     .then(x => setAlbum(x.body))
    }, [])

    return(
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full  rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex justify-between place-items-center p-8">
                <div className="w-full h-32 flex place-items-center">
                    <FaImages className="w-32 h-2/3"/>
                    <h1 className="capitalize-first text-lg">{album?.title ?? "-"}</h1>
                </div>
                <div className="flex flex-col place-items-end">
                    <span className="text-2xl font-semibold">
                        {user?.name}
                    </span>
                    <span className="text-lg opacity-80">
                        @{user?.username}
                    </span>
                </div>
            </div>
        </section>
    )
}