import { CreateResCommentDTO, CreateReqCommentDTO } from '../../api/dtos/comment';
import { collections } from '../../mongodb';
import { Comment } from '../entities/comment';

export default class CommentService {
    public async createComment(commentDto: CreateReqCommentDTO, userId: string): Promise<CreateResCommentDTO> {
        const comment = new Comment(
            userId!,
            commentDto.spotedId,
            commentDto.comment,
            commentDto.commentFather
        );
        await collections.comment?.insertOne(comment)
        return { id: comment.id! }
    }

    public async find({ spotedId }: { spotedId: string }): Promise<Array<Comment>> {
        const comments = (await collections.comment?.find({ spotedId }).toArray()) as Array<Comment>
        return comments
    }

    public async delete({ id }: { id: string }): Promise<number> {
        const result = await collections.comment?.deleteOne({ id })
        return result!.deletedCount
    }
}