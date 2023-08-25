export interface CreateReqCommentDTO {
    comment: string
    spotedId: string
    commentFather: string
}

export interface CreateResCommentDTO {
    id: string
}
export interface GetReqCommentDTO {
    spotedId: string
}
