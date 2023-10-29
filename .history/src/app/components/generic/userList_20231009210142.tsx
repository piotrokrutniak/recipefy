"use client"
import GetUsers from "@/app/integration/jsonApi/getUsers"
import { User } from "@/app/types"
import { useEffect, useState } from "react"
import { GeneratePages, PaginationPanel } from "./paginationPanel"
import { BsArrowClockwise } from "react-icons/bs"
import { LoadingPanel } from "./loadingPanel"

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
        <div className="min-h-screen-3/4 flex flex-col justify-between w-full bg-black px-4 rounded-md gap-2">
            <div className="flex flex-col gap-2">
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
        <div className="w-full flex bg-slate-500/30 p-4 rounded-md">
            {user.name}
        </div>
    )
}