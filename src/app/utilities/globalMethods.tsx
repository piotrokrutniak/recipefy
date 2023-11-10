export function GetDate(){
    let today = new Date()
    let yyyy = today.getFullYear()
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let dd = String(today.getDate()).padStart(2, '0')
    
    return yyyy + '-' + mm + '-' + dd
}

export function GetDateTime(){
    let today = new Date()
    let yyyy = today.getFullYear()
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let dd = String(today.getDate()).padStart(2, '0')
    let hr = String(today.getHours()).padStart(2, '0')
    let mn = String(today.getMinutes()).padStart(2, '0')
    
    return yyyy + '-' + mm + '-' + dd + " " + hr + ":" + mn
}

export function ParseDate(date: string){
    let today = new Date(date)
    let yyyy = today.getFullYear()
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let dd = String(today.getDate()).padStart(2, '0')
    
    return yyyy + '-' + mm + '-' + dd
}

export function ParseDateTime(date: string){
    let today = new Date(date)
    let yyyy = today.getFullYear()
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let dd = String(today.getDate()).padStart(2, '0')
    let hr = String(today.getHours()).padStart(2, '0')
    let mn = String(today.getMinutes()).padStart(2, '0')
    
    return yyyy + '-' + mm + '-' + dd + " " + hr + ":" + mn
}