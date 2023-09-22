import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, ClassErrorMiddleware, ErrorMiddleware, Wrapper, ClassWrapper, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { RequestAuth, authMiddleware } from '../middleware/authMiddleware';
import UserService from '../../domain/services/UserService';
import { CreateReqUserDTO, GetResUserDTO, EditReqUserDTO } from '../dtos/user';
import errorMiddleware from '../middleware/errorMiddleware';
import { asyncWrapper } from '../middleware/asyncWrapper';

@Controller('user')
@ClassErrorMiddleware(errorMiddleware)
@ClassWrapper(asyncWrapper)
export class UserController {
    userService: UserService = new UserService()

    @Get('')
    @Middleware(authMiddleware)
    private async get(req: RequestAuth, res: Response) {
        const id = req.query.id?.toString() || req.user._id!
        const user: GetResUserDTO = (await this.userService.getUser(id)) as GetResUserDTO
        res.send(user)
    }

    @Post('/')
    @ErrorMiddleware(errorMiddleware)
    private async create(req: Request, res: Response) {
        const user: CreateReqUserDTO = req.body
        const userCreated = await this.userService.createUser(user);
        res.send(userCreated)
    }

    @Put('/')
    @ErrorMiddleware(errorMiddleware)
    @Middleware(authMiddleware)
    private async edit(req: RequestAuth, res: Response) {
        const user: EditReqUserDTO = req.body;
        const userId: string = req.user._id!
        const userCreated = await this.userService.editUser(user, userId)
        res.send(userCreated)
    }

}