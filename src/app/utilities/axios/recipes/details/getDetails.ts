import axios from "axios"

export async function getRecipeDetails(id: string){
    const result = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/recipes/' + id + "/details",
    })
    return result.data
}