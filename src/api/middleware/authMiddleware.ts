import { NextFunction, Request, Response } from "express";
import AuthService from "../../domain/services/AuthService";
import { User } from "../../domain/entities/user";

export interface RequestAuth extends Request {
    user: User
}

export function authMiddleware(
    req: any,
    res: Response,
    next: NextFunction
): void {
    const token = req.headers?.['x-access-token'];
    try {
        const decoded = AuthService.decodeToken(token as string);
        req.user = decoded;
        next();
    } catch (err: any) {
        res.status?.(401).send({ code: 401, error: err.message });
    }
}