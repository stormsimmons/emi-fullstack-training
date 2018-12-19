import { MongoClient, Collection, ObjectID } from "mongodb";
import { User } from "../models/user";

export class UserRepository {

    constructor() {
    }

    public async list(): Promise<User[]> {
        const collection = await this.getCollection();
        return await this.mapPromise(collection.find().toArray());
    }

    public async getOne(username: string): Promise<User> {
        const collection = await this.getCollection();
        return await this.mapPromise(collection.findOne({ userName: username }));
    }
    public async delete(id: string): Promise<void> {
        const collection = await this.getCollection();
        await collection.deleteOne({ _id: new ObjectID(id) });
    }

    public async update(user: User): Promise<void> {
        const collection = await this.getCollection();
        await collection.updateOne({ _id: new ObjectID(user._id) }, user);
    }
    public async insert(user: User): Promise<User> {
        const collection = await this.getCollection();
        let id = new ObjectID();
        user._id = id;

        await collection.insertOne(user);
        return await this.getOne(user.userName)
    }

    private getCollection(): Promise<Collection<User>> {
        return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://localhost:27017", (err, client) => {
                if (err) {
                    reject(err);
                }
                
                const db = client.db("UserDB");
                resolve(db.collection<User>("User"));
            })
        });
    }

    private mapPromise<T>(promise: Promise<T>): Promise<T> {
        return new Promise((res, rej) => {
            promise.then((result: any) => {
                if (result instanceof Array) {
                    res(<any>result.map(this.toUser))
                } else {
                    res(<any>this.toUser(result))
                }
            })
        })

    }

    private toUser(user:any) : User {
        if(!user){
            return null;
        }
        return  new User(
            user._id,
            user.firstName,
            user.lastName,
            user.userName,
            user.password
          );
    }
}