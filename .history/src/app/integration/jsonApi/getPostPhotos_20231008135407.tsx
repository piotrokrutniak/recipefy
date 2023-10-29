
export default async function GetAlbumPhotos(id: number, page: number){
    let response = await fetch(`https://jsonplaceholder.typicode.com/post/${id}/photos${page ? `?_page=${page}` : ""}`,
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