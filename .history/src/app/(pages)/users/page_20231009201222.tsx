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
    const [page, setPage] = useState(1)
    useEffect(() => {
      GetUsers(page)
        .then((x) => setUsers([...x.body]))
    }, [page])
    
    return(
        <>
        {users.map(x => <UserItem user={x}/>)}
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