"use client"

import GetPosts from "@/app/integration/jsonApi/getPosts"
import { Post } from "@/app/types"
import { useEffect, useState } from "react"
import greekMeatLoaf from '../../../../public/media/breakfast.jpg'
import { Post as PostItem } from "../posts/post"

export default function PostList(){
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        GetPosts()
            .then(x => setPosts([...x]))
    }, [])
    
    return(
        <div className="text-white">
            POSTS LIST: {posts.length}

            {posts.map(x => 
                <PostItem 
                    desc={x.body} 
                    title={x.title}
                    image={greekMeatLoaf}
                    rating={2.3} 
                    saved={false}
                    tags={["Lunch"]}/>
            )}
        </div>
    )
}