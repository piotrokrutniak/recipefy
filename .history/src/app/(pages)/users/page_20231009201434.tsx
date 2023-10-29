import { PaginationPanel } from "@/app/components/generic/paginationPanel";
import GetUsers from "@/app/integration/jsonApi/getUsers";
import { User } from "@/app/types";
import { useEffect, useState } from "react";

export default function UsersPage(pageData: {searchParams: any}){
    return(
        <section className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 mx-auto w-full rounded-xl shadow-md shadow-black/40 text-white'>
            <div className="p-8">
                <span className="font-semibold text-xl">Users</span>
            </div>
            <div className="">
                <UsersList/>
            </div>
        </section>
    )
}

function UsersList(){
    const [users, setUsers] = useState<User[]>([])
    const [pages, setPages] = useState<number[]>([])
    const [page, setPage] = useState(1)
    useEffect(() => {
      GetUsers(page)
        .then((x) => setUsers([...x.body]))
    }, [page])
    
    function ChangePage(value: number){
        if(page != value){
            setUsers([])
            setPage(value)
        }
    }

    return(
        <>
        {users.map(x => <UserItem user={x}/>)}
        <div className="flex justify-center w-full bg-black p-8 rounded-md gap-2">
                <PaginationPanel page={page} setPage={ChangePage} pages={pages}/>
        </div>
        </>
    )
}

function UserItem({user}:{user:User}){
    return(
        <div>
            {user.name}
        </div>
    )
}