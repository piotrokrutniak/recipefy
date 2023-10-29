"use client"
import GetUser from "@/app/integration/jsonApi/getUser";
import { User } from "@/app/types";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>();

    useEffect(() => {
      GetUser(data.id).then(x => setUser(x))
    }, [])
    

    return(
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 mx-auto w-full rounded-xl shadow-md shadow-black/40 text-white'>
            <div className="flex justify-between place-items-center p-6 md:p-8">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-slate-600 flex justify-center place-items-center">
                    <FaUser className="w-full h-2/3"/>
                </div>
                <div className="flex flex-col place-items-end">
                    <span className="text-lg md:text-xl font-semibold">
                        {user?.name ?? "-"}
                    </span>
                    <span className="text-base md:text-lg opacity-80">
                        @{user?.username}
                    </span>
                </div>
            </div>
        </section>
    )
}   