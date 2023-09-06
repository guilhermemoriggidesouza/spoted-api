import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user';
import config from '../../config';
import { collections } from '../../mongodb';
import mail, { MESSAGES } from '../../infra/mail';
import UserService from './UserService';
import { ObjectId } from 'mongodb';

export default class AuthService {
    userService: UserService = new UserService();

    public async genRecoverCode(email: string) {
        if(!email){
            throw Error("Email não foi informado");
        }
        const user = await collections.user?.findOne({ email }) as User;
        if (!user) {
            throw Error("Não foi encontrado um usuário com esse email");
        }
        const code = Math.floor(100000 + Math.random() * 900000)
        await collections.user?.updateOne(
            { _id: new ObjectId(user._id) },
            { "$set": { recoverCode: code } }
        )
        await mail.sendMail(email, MESSAGES.CODE_GEN.subject, MESSAGES.CODE_GEN.body({ name: user.name, code: code.toString() }))
        return true;
    }

    public async comparePasswords(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public generateToken(payload: object): string {
        return jwt.sign(payload, config.auth.key, {});
    }

    public static decodeToken(token: string): User {
        return jwt.verify(token, config.auth.key) as User;
    }

    public async login(login: string, pass: string): Promise<string> {
        const user = await collections.user?.findOne({ login }) as User
        if (!user) {
            throw Error("Não foi encontrado um usuário com esse login");
        }

        const isUser = await this.comparePasswords(pass, user.password!)
        if (isUser) {
            const token: string = jwt.sign(user, config.auth.key);
            return token
        } else {
            throw Error("senha inválida")
        }
    }

    public async changePassword(email: string, password: string, code: string) {
        const user = await collections.user?.findOne({ email, recoverCode: parseInt(code) }) as User;
        if (!user) {
            throw Error("Não foi encontrado um usuário com esse email e código");
        }
        await collections.user?.updateOne(
            { _id: new ObjectId(user._id) },
            { "$set": { recoverCode: null, password: await this.userService.hashPassword(password) } },
            { upsert: true }
        );
        return true
    }

}