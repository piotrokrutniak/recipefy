"use client"
import GetUsers from "@/app/integration/jsonApi/getUsers"
import { User } from "@/app/types"
import { useEffect, useState } from "react"
import { GeneratePages, PaginationPanel } from "./paginationPanel"
import { BsArrowClockwise } from "react-icons/bs"
import { LoadingPanel } from "./loadingPanel"
import { UserPanel } from "./userPanel"
import Link from "next/link"

export function UserList(){
    const [users, setUsers] = useState<User[]>([])
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] =  useState(true)

    useEffect(() => {
      setLoading(true)  
      GetUsers(page)
        .then((x) => {
            setUsers([...x.body])
            return x
        })
        .then((x) => setPages([...GeneratePages(page, Number.parseInt(x.count))]))
        .then(() => setLoading(false))
    }, [page])
    
    function ChangePage(value: number){
        if(page != value){
            setUsers([])
            setPage(value)
        }
    }

    return(
        <div className="min-h-screen-3/4 flex flex-col justify-between w-full md:p-8 bg-black px-4 rounded-md gap-2">
            <div className="flex flex-col sm:grid sm:grid-auto-fit-xl gap-2">
                {loading || users.length < 0 ? 
                <LoadingPanel/> : 
                users.map(x => <UserItem user={x}/>)}
            </div>
            <div className="flex justify-center p-4 w-full">
                <PaginationPanel page={page} setPage={ChangePage} pages={pages}/>
            </div>
        </div>
    )
}

function UserItem({user}:{user:User}){
    return(
        <div className="w-full flex flex-col bg-slate-500/30 p-4 rounded-md">
            <UserPanel className="flex justify-between 2xs:p-2" user={user}/>
            <Link href={"/users/" + user.id}>
                <p className="w-fit ml-auto mr-0 text-xs md:text-sm p-3 bg-black/30 rounded-md mt-2 hover:text-vermilion-400 active:opacity-80">{user?.company?.name}</p>
            </Link>
        </div>
    )
}