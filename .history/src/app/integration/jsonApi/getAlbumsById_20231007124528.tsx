
export default async function GetAlbumsByUserId(page: number = 1, userId?: number){
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?${userId ? `=userId=${userId}` : ""}_page=${page}`,
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