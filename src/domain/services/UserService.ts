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
        const userFinded: User = (await collections.user?.findOne({ login: user.login })) as User
        if (userFinded) {
            throw Error("Já existe um user com esse login")
        }
        const result = await collections.user?.insertOne(user)
        return { _id: result?.insertedId.toString()! }
    }
}