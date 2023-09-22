export interface CreateReqUserDTO {
    name: string,
    login: string,
    email: string,
    password: string,
    bio?: string,
    age?: string,
    facul?: string,
    ocupation?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
}

export interface EditReqUserDTO {
    name: string,
    login: string,
    email: string,
    password: string,
    bio?: string,
    age?: string,
    facul?: string,
    ocupation?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
}

export interface CreateResUserDTO {
    _id: string
}

export interface GetResUserDTO {
    id: string
    name: string,
    email: string,
    login: string,
    password: string,
    bio?: string,
    facul?: string,
    ocupation?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
}