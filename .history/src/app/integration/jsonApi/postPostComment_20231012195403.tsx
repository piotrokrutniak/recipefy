import { Comment } from "@/app/types"

export default async function PostCommentPost(data: Comment){
    let response = await fetch(`https://jsonplaceholder.typicode.com/comments`,
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }
    )

    let body = await response.json()

    return {body: body}
}