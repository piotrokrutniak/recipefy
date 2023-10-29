"use client"
import GetUser from "@/app/integration/jsonApi/getUser";
import { User } from "@/app/types";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>();

    useEffect(() => {
      GetUser(data.id).then(x => setUser(x))
    }, [])
    

    return(
        <section id="header-section" className='max-w-7xl bg-black/90 m-auto w-full p-8 rounded-xl mt-4 shadow-md shadow-black/40'>
            <div className="flex justify-between place-items-center">
                <div className="w-32 h-32 rounded-full bg-slate-400"></div>
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