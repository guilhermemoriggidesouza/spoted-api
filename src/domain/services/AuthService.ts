import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user';
import config from '../../config';
import { collections } from '../../mongodb';

export default class AuthService {

    public async comparePasswords(
        password: string,
        hashedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    public generateToken(payload: object): string {
        return jwt.sign(payload, config.auth.key, {
            expiresIn: config.auth.tokenExpiresIn,
        });
    }

    public static decodeToken(token: string): User {
        return jwt.verify(token, config.auth.key) as User;
    }

    public async login(login: string, pass: string): Promise<string> {
        const user = await collections.user?.findOne({ login }) as User
        const isUser = await this.comparePasswords(pass, user.password!)
        if (isUser) {
            const token: string = jwt.sign(user, config.auth.key);
            return token
        } else {
            throw Error("senha inválida")
        }
    }

}