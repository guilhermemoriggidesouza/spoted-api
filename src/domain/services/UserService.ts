import bcrypt from 'bcrypt';
import { User } from '../entities/user';
import { collections } from '../../mongodb';
import { CreateResUserDTO, CreateReqUserDTO, EditReqUserDTO } from '../../api/dtos/user';
import { ObjectId } from 'mongodb';

export default class UserService {
    public async getUser(id: string): Promise<User> {
        const user: User = (await collections.user?.findOne({ _id: new ObjectId(id) })) as User
        if (!user) {
            throw new Error("Não foi possível achar esse user")
        }
        // delete user.password
        return user
    }

    public async hashPassword(
        password: string,
        salt = 10
    ): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async createUser(userDto: CreateReqUserDTO): Promise<CreateResUserDTO> {
        const user: User = new User(
            userDto.name,
            userDto.login,
            userDto.email,
            undefined,
            userDto.bio,
            userDto.age,
            userDto.facul,
            userDto.ocupation,
            userDto.facebook,
            userDto.instagram,
            userDto.twitter,
            undefined,
            userDto.password,
            undefined,
        );
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

    async editUser(userDto: EditReqUserDTO, userId: string): Promise<boolean> {
        const user: User = new User(
            userDto.name,
            userDto.login,
            userDto.email,
            undefined,
            userDto.bio,
            userDto.age,
            userDto.facul,
            userDto.ocupation,
            userDto.facebook,
            userDto.instagram,
            userDto.twitter,
            undefined,
            undefined,
            undefined,
        );
        await collections.user?.updateOne({ _id: new ObjectId(userId) }, { "$set": { ...user } }, { ignoreUndefined: true })
        return true;
    }
}