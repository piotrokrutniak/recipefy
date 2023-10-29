import { User } from "@/app/types"

export default async function GetUser(id: number){
    let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,
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