import { UserRepository } from "../repositories/user-repository";
import * as md5 from 'md5';
import { User } from "../models/user";
export class AuthService {

    constructor(private userRepositroy: UserRepository) { }

    public async varifyCredentials(username: string, password: string): Promise<string> {
        let user = await this.userRepositroy.getOne(username);
        if (!user) {
            return "Not Found";
        }
        let hashedPassword = this.hashPassword(password);
        if (user.password != hashedPassword) {
            return "Wrong Password";
        }
        return "Valid";
    }

    public async register(user:User): Promise<User> {
        user.password = this.hashPassword(user.password);
        return await this.userRepositroy.insert(user);
    }

    private hashPassword(password:string) {
        return md5(password);
    }

}