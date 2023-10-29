
export default async function GetCommentsByPostId(page: number = 1, postId: number){
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments_page=${page}`,
                        {
                            method: 'GET',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                        }
    )

    let body = await response.json()
    let headers = response.headers

    return {body: body, count: headers.get("x-total-count") ?? "0"}
}