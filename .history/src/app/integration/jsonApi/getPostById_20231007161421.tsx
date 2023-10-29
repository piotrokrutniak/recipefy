
export default async function GetAlbumById(id?: number){
    let response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`,
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