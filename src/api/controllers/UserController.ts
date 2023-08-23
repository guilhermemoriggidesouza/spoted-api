import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, ClassErrorMiddleware, ErrorMiddleware, Wrapper, ClassWrapper } from '@overnightjs/core';
import { Request, Response } from 'express';
import { RequestAuth, authMiddleware } from '../middleware/authMiddleware';
import UserService from '../../domain/services/UserService';
import { User } from '../../domain/entities/user';
import { CreateReqUserDTO, GetResUserDTO } from '../dtos/user';
import errorMiddleware from '../middleware/errorMiddleware';
import { asyncWrapper } from '../middleware/asyncWrapper';

@Controller('user')
@ClassErrorMiddleware(errorMiddleware)
@ClassWrapper(asyncWrapper)
export class UserController {
    userService: UserService = new UserService()

    @Get(':id')
    @Middleware(authMiddleware)
    private async get(req: RequestAuth, res: Response) {
        const id = req.params.id
        const user: GetResUserDTO = (await this.userService.getUser(id)) as GetResUserDTO
        res.send(user)
    }

    @Post('/')
    @ErrorMiddleware(errorMiddleware)
    private async create(req: Request, res: Response) {
        const user: CreateReqUserDTO = req.body
        const userCreated = await this.userService.createUser(user as User)
        res.send(userCreated)
    }

}