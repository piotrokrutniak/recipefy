"use client"

import GetPosts from "@/app/integration/jsonApi/getPosts"
import { Post } from "@/app/types"
import { useEffect, useState } from "react"
import greekMeatLoaf from '../../../../public/media/breakfast.jpg'
import { PostItem } from "../posts/post"

export default function PostList(){
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        GetPosts(page)
            .then(x => setPosts([...x]))
    }, [])
    
    return(
        <div className="text-white flex flex-col gap-5">
            {posts.map(x => 
                <PostItem 
                    post={x}/>
            )}
            <div className="flex justify-center w-full bg-black p-8 rounded-md gap-2">
                
            </div>
        </div>
    )
}

function PaginationPanel({page = 1}:{page: number}){
    let start = 1
    let pages: number[] = []

    if(page>3){
        start = page - 2
    }

    for(let i = start; i < start + 5; i++){
        pages.push(i)
    }

    return(
        pages.map(x => <div className={`${x == page ? "bg-sky-600" : "bg-slate-300/40"} h-8 w-8 aspect-square  flex justify-center items-center rounded-md`}> {x} </div>)
    )
}