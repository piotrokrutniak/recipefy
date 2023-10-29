"use client"

import GetPosts from "@/app/integration/jsonApi/getPosts"
import { Post } from "@/app/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import greekMeatLoaf from '../../../../public/media/breakfast.jpg'
import { PostItem } from "../posts/post"

export default function PostList(){
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState(1)
    
    useEffect(() => {
        GetPosts(page)
            .then(x => setPosts([...x]))
    }, [page])
    
    return(
        <div className="text-white flex flex-col gap-5">
            {posts.map(x => 
                <PostItem 
                    post={x}/>
            )}
            <div className="flex justify-center w-full bg-black p-8 rounded-md gap-2">
                <PaginationPanel page={1} setPage={setPage}/>
            </div>
        </div>
    )
}

function PaginationPanel({page = 1, setPage} : {
        page: number; 
        setPage: Dispatch<SetStateAction<number>>
    }){

    let start = 1
    

    const [pages, setPages] = useState<number[]>([])

    if(page>3){
        start = page - 2
    }

    let tempPages: number[] = []

    for(let i = start; i < start + 5; i++){
        tempPages.push(i)
    }

    return(
        pages.map(x => 
            <PageButton index={x} page={page} setPage={setPage}/>
        )
    )
}

function PageButton({index, page, setPage} : {
    index: number; 
    page: number; 
    setPage: Dispatch<SetStateAction<number>>
    }){
    return(
        <div className={`${index == page ? "bg-sky-600" : "bg-slate-300/40"} h-8 w-8 aspect-square 
            flex justify-center items-center rounded-md cursor-pointer select-none
            opacity-80 hover:opacity-100 active:opacity-60`}
            onClick={() => setPage(index)}> 
            {index} 
        </div>
    )
}