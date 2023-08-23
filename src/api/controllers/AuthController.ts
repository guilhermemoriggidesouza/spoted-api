import { OK } from 'http-status-codes';
import { Controller, Middleware, Get, Post, ClassErrorMiddleware, ClassWrapper } from '@overnightjs/core';
import { Response } from 'express';
import { RequestAuth, authMiddleware } from '../middleware/authMiddleware';
import AuthService from '../../domain/services/AuthService';
import errorMiddleware from '../middleware/errorMiddleware';
import { asyncWrapper } from '../middleware/asyncWrapper';

@Controller('auth')
@ClassErrorMiddleware(errorMiddleware)
@ClassWrapper(asyncWrapper)
export class AuthController {
    authService: AuthService = new AuthService();

    @Get('/')
    private get(req: RequestAuth, res: Response) {
        const jwt = req.headers["x-access-token"] as string
        const user = AuthService.decodeToken(jwt)
        res.status(OK).json(user);
    }

    @Post('login')
    private async login(req: RequestAuth, res: Response) {
        const login = req.body.login
        const pass = req.body.password
        const token = await this.authService.login(login, pass)
        res.send({ token })
    }
}