
export default async function GetPosts(page: number = 1){
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`,
                        {
                            method: 'GET',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                        }
    )

    let body = await response.json()
    return await body
}