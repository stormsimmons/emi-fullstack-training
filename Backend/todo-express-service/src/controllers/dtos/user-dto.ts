import { User } from "../../models/user";

export class UserDto {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public userName: string,
        public password: string) { }

    public static fromUser(user: User): UserDto {
        return new UserDto(user._id,
            user.firstName,
            user.lastName,
            user.userName,
            user.password)
    }
}