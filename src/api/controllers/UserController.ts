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
        console.log(user)
        const userCreated = await this.userService.createUser(
            new User(
                user.name,
                user.login,
                user.email,
                undefined,
                user.bio,
                user.age,
                user.facul,
                user.ocupation,
                user.facebook,
                user.instagram,
                user.twitter,
                undefined,
                user.password,
                undefined,
            ),
        )

        res.send(userCreated)
    }

}