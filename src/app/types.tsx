export type FileOrUndefined = File | undefined;

export type Post = {
    id: number,
    userId: number,
    title: string,
    body: string
}

export type User = {
    id: number,
    name: string,
    phone: string,
    email: string,
    username: string,
    website: string,
    address?: Address,
    company?: Company
}

export type Address = {
    city: string,
    street: string,
    suite: string,
    zipcode: string,
    geo: Geo,
    company: Company
}

export type Geo = {
    lat: string,
    lng: string
}

export type Company = {
    name: string,
    catchPhrase: string,
    bs: string
}

export type Album = {
    id: number,
    userId: number,
    title: string
}

export type Photo = {
    id: number,
    albumId: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export type Comment = {
    id: number,
    postId: number,
    name: string,
    email: string,
    body: string
}