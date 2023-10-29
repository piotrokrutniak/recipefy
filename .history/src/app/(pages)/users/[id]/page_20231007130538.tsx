"use client"
import GetAlbumsByUserId from "@/app/integration/jsonApi/getAlbumsByUserId";
import GetUser from "@/app/integration/jsonApi/getUser";
import { User } from "@/app/types";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>();

    useEffect(() => {
      GetUser(data.id)
        .then(x => setUser(x))
        .then(() => GetAlbumsByUserId(1, user?.id))
      
    }, [])
    

    return(
        <>
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full  rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex justify-between place-items-center p-8">
                <div className="w-32 h-32 rounded-full bg-slate-600 flex justify-center place-items-center">
                    <FaUser className="w-full h-2/3"/>
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

            <div className="flex flex-col gap-4 p-8 bg-slate-500/20">
                <h1 className="text-2xl font-bold">Contact Information</h1>
                <ul className="flex flex-col gap-4">
                    <li>
                        <h2 className="text-lg font-semibold">Email</h2>
                        <p className="lowercase">{user?.email ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold">Phone</h2>
                        <p>{user?.phone ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold">Company</h2>
                        <p>{user?.company?.name ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold">Website</h2>
                        <p className="lowercase">{user?.website ?? "-"}</p>
                    </li>
                </ul>
            </div>
        </section>
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full  rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex flex-col gap-4 p-8 bg-slate-500/20">
                <h1 className="text-2xl font-bold">Albums</h1>
                <ul className="flex flex-col gap-4">
                    <li>
                        <AlbumPanel/>
                    </li>
                </ul>
            </div>
        </section>
        </>
    )
}   

function AlbumPanel(){
    return(
        <div className="w-36 h-44 bg-slate-100/10 rounded-md">

        </div>
    )
}