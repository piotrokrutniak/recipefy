"use client"
import GetPosts from "@/app/integration/jsonApi/getPosts"
import { Post } from "@/app/types"
import { useEffect, useState } from "react"
import { PostItem } from "../posts/post"
import { GeneratePages, PaginationPanel } from "./paginationPanel"
import { BsArrowClockwise } from "react-icons/bs"

export default function PostList(){
    const [posts, setPosts] = useState<Post[]>([])
    const [page, setPage] = useState<number>(1)
    const [pages, setPages] = useState<number[]>([])
    const [count, setCount] = useState<number>(0)

    const [loading, setLoading] =  useState(true)

    useEffect(() => {
        setLoading(true) 
        GetPosts(page)
            .then(x => {
                setPosts([...x.body]); 
                setCount(Number.parseInt(x.count)); 
                return x
            })
            .then((x) => setPages([...GeneratePages(page, Number.parseInt(x.count))]))
            .then(() => setLoading(false))
    }, [page])
    
    function ChangePage(value: number){
        if(page != value){
            setPosts([])
            setPage(value)
        }
    }

    return(
        <div className="text-white flex flex-col  gap-5">
            {loading || posts.length < 0 ? 
            <div className="flex gap-2 select-none min-h-screen-1/2 place-items-center bg-black p-8 rounded-md justify-center"> <p>Loading results</p> <BsArrowClockwise className="animate-spin h-6 w-6"/></div> : 
            posts.map((x: Post, key) => <PostItem post={x} key={key}/>)}
            {!loading &&
            <div className="flex justify-center w-full bg-black p-8 rounded-md gap-2">
                <PaginationPanel page={page} setPage={ChangePage} pages={pages}/>
            </div>}
        </div>
    )
}