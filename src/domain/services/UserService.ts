import bcrypt from 'bcrypt';
import { User } from '../entities/user';
import { collections } from '../../mongodb';
import { CreateResUserDTO } from '../../api/dtos/user';
import { ObjectId } from 'mongodb';

export default class UserService {
    public async getUser(id: string): Promise<User> {
        const user: User = (await collections.user?.findOne({ _id: new ObjectId(id) })) as User
        if (!user) {
            throw new Error("Não foi possível achar esse user")
        }
        delete user.password
        return user
    }

    public async hashPassword(
        password: string,
        salt = 10
    ): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async createUser(user: User): Promise<CreateResUserDTO> {
        user.password = await this.hashPassword(user.password!)
        const userFindedLogin: User = (await collections.user?.findOne({ login: user.login })) as User
        const userFindedEmail: User = (await collections.user?.findOne({ email: user.email })) as User
        if (userFindedLogin) {
            throw Error("Já existe um user com esse login")
        }
        if (userFindedEmail) {
            throw Error("Já existe um user com esse email")
        }
        const result = await collections.user?.insertOne(user)
        return { _id: result?.insertedId.toString()! }
    }
}