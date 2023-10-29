"use client"

import GetPosts from "@/app/integration/jsonApi/getPosts"
import { Post } from "@/app/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import greekMeatLoaf from '../../../../public/media/breakfast.jpg'
import { PostItem } from "../posts/post"
import { count } from "console"
import { GeneratePages, PaginationPanel } from "./paginationPanel"

export default function PostList(){
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState<number[]>([])
    const [count, setCount] = useState<number>(0)
    useEffect(() => {
        GetPosts(page)
            .then(x => {
                setPosts([...x.body]); 
                setCount(Number.parseInt(x.count)); 
                return x
            })
            .then((x) => setPages([...GeneratePages(page, Number.parseInt(x.count))]))
    }, [page])
    
    return(
        <div className="text-white flex flex-col gap-5">
            {posts.map(x => 
                <PostItem 
                    post={x}/>
            )}
            <div className="flex justify-center w-full bg-black p-8 rounded-md gap-2">
                <PaginationPanel page={page} setPage={setPage} pages={pages}/>
            </div>
        </div>
    )
}