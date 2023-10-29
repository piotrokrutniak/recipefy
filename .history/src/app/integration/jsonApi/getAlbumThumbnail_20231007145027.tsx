
export default async function GetAlbumThumbnail(albumId?: number){
    let response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos?_limit=1`,
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