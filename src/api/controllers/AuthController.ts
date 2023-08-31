import { OK } from 'http-status-codes';
import { Controller, Middleware, Get, Post, ClassErrorMiddleware, ClassWrapper, ClassMiddleware, Put } from '@overnightjs/core';
import { Response, Request } from 'express';
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
    private get(req: Request, res: Response) {
        const jwt = req.headers["x-access-token"] as string
        const user = AuthService.decodeToken(jwt)
        res.status(OK).json(user);
    }

    @Post('login')
    private async login(req: Request, res: Response) {
        const login = req.body.login
        const pass = req.body.password
        const token = await this.authService.login(login, pass)
        res.send({ token })
    }

    @Get('recover/code')
    private async recoverPassCode(req: Request, res: Response) {
        const email = req.query.email
        const sendEmail = await this.authService.genRecoverCode(email?.toString()!)
        res.send({ sendEmail })
    }

    @Put('password')
    @Middleware(authMiddleware)
    private async changePass(req: RequestAuth, res: Response) {
        const code = req.query.code
        const pass = req.query.password
        const email = req.query.email
        const changePassword = await this.authService.changePassword(email?.toString()!, pass?.toString()!, code?.toString()!);
        res.send({ changePassword })
    }
}