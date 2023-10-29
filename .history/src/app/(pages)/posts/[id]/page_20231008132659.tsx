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
            <div id="user-info" className="flex max-xs:justify-between px-2 flex-row-reverse gap-5">
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
        </section>
    )
}   