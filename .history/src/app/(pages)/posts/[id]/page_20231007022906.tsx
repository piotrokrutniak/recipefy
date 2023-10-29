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
        <div className="text-white" onClick={() => console.log(pageData)}>
            {user?.name}
            {user?.username}
            {user?.phone}
            {user?.website}
            {typeof(pageData)}
            
        </div>
    )
}