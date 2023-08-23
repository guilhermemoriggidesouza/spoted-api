export interface CreateReqUserDTO {
    name: string,
    login: string,
    email: string,
    password: string,
    bio: string,
    facul: string,
    ocupation: string,
    facebook: string,
    instagram: string,
    twitter: string
}

export interface CreateResUserDTO {
    id: string
}

export interface GetResUserDTO {
    id: string
    name: string,
    email: string,
    login: string,
    password: string,
    bio: string,
    facul: string,
    ocupation: string,
    facebook: string,
    instagram: string,
    twitter: string
}