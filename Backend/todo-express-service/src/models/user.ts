import { ObjectID } from "mongodb";

export class User {
    constructor(
        public _id: string | ObjectID,
        public firstName: string, 
        public lastName: string, 
        public userName: string, 
        public password: string) { }
}