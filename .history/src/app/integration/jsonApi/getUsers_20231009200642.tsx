
export default async function GetPosts(page: number = 1){
    let response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}`,
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