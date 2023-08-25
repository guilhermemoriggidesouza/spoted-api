import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';

export default (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log("catched error :", error.message, "code :", error.code, "stack :", error.stack)
    if (error.code && error.code.toString().length >= 3) {
        res.status(error.code).send({ message: error.message })
    } else {
        res.status(BAD_REQUEST).send({ message: error.message })
    }
}