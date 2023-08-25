import { Controller, Get, Post, ClassErrorMiddleware, ClassWrapper, ClassMiddleware, Delete } from '@overnightjs/core';
import { Response } from 'express';
import { RequestAuth, authMiddleware } from '../middleware/authMiddleware';
import errorMiddleware from '../middleware/errorMiddleware';
import { asyncWrapper } from '../middleware/asyncWrapper';
import CommentService from '../../domain/services/CommentService';
import { CreateReqCommentDTO, GetReqCommentDTO } from '../dtos/comment';
import { Comment } from '../../domain/entities/comment';

@Controller('comment')
@ClassErrorMiddleware(errorMiddleware)
@ClassWrapper(asyncWrapper)
@ClassMiddleware(authMiddleware)
export class CommentController {
    commentService: CommentService = new CommentService()

    @Post('/')
    private async create(req: RequestAuth, res: Response) {
        const comment: CreateReqCommentDTO = req.body
        const commentCreated = await this.commentService.createComment(
            new Comment(
                req.user.id!,
                comment.spotedId,
                comment.comment,
                comment.commentFather
            ),
        )
        res.send(commentCreated)
    }

    @Get('/')
    private async get(req: RequestAuth, res: Response) {
        const { spotedId }: GetReqCommentDTO = req.query as unknown as GetReqCommentDTO
        const comments: Array<Comment> = await this.commentService.find({
            spotedId
        })
        res.send(comments)
    }

    @Delete(":id")
    private async delete(req: RequestAuth, res: Response) {
        const id = req.params.id
        const numberDeleted = await this.commentService.delete({ id })
        res.send({
            numberDeleted
        })

    }
}