export interface CreateReqSpotedDTO {
    title: string,
    description: string,
    userId: string,
    lat: number,
    log: number,
}

export interface CreateResSpotedDTO {
    id: string
}

export interface DeleteResSpotedDTO {
    numberDeleted: string
}

export interface GetReqSpotedDTO {
    radius: number,
    fromUser: string,
    lat: number,
    log: number
}