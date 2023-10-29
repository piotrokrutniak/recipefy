"use client"
import GetUsers from "@/app/integration/jsonApi/getUsers"
import { User } from "@/app/types"
import { useEffect, useState } from "react"
import { GeneratePages, PaginationPanel } from "./paginationPanel"

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
        <div className="min-h-screen-3/4">
        {users.map(x => <UserItem user={x}/>)}
        <div className="flex justify-center w-full bg-black p-8 rounded-md gap-2">
                <PaginationPanel page={page} setPage={ChangePage} pages={pages}/>
        </div>
        </div>
    )
}

function UserItem({user}:{user:User}){
    return(
        <div>
            {user.name}
        </div>
    )
}