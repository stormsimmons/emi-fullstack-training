import { MongoClient, Collection, ObjectID, UpdateQuery } from "mongodb";
import { Todo } from "../models/todo";

export class TodoRepository {

    constructor() {
    }

    public async list(): Promise<Todo[]> {
        const collection = await this.getCollection();
        return await this.mapPromise(collection.find().toArray());
    }

    public async listByUser(userName:string): Promise<Todo[]> {
        const collection = await this.getCollection();
        return await this.mapPromise(collection.find({userName:userName}).toArray());
    }

    public async getOne(id: string): Promise<Todo> {
        const collection = await this.getCollection();
        return await this.mapPromise(collection.findOne({ _id: new ObjectID(id) }));
    }
    public async delete(id: string): Promise<void> {
        const collection = await this.getCollection();
        await collection.deleteOne({ _id: new ObjectID(id) });
    }

    public async update(todo: Todo): Promise<Todo> {
        if(!todo._id){
            return null;
        }
        const collection = await this.getCollection();
        let result = await collection.findOneAndUpdate({ _id: new ObjectID(todo._id) }, {$set : { 
            lastUpdatedAt: new Date(Date.now()),
            status : todo.status
        }});

        return await this.getOne(todo._id.toString());
    }
    public async insert(todo: Todo): Promise<Todo> {
        const collection = await this.getCollection();
        let id = new ObjectID();
        todo._id = id;
        todo.createdAt = new Date(Date.now());
        await collection.insertOne(todo);
        return await this.getOne(id.toHexString());
    }

    private getCollection(): Promise<Collection<Todo>> {
        return new Promise((resolve, reject) => {
            MongoClient.connect("mongodb://localhost:27017", (err, client) => {
                if (err) {
                    reject(err);
                }

                const db = client.db("TodoDB");
                resolve(db.collection<Todo>("Todo"));
            })
        });
    }

    private mapPromise<T>(promise: Promise<T>): Promise<T> {
        return new Promise((res, rej) => {
            promise.then((result: any) => {
                if (result instanceof Array) {
                    res(<any>result.map(this.toTodo))
                } else {
                    res(<any>this.toTodo(result))
                }
            })
        })

    }

    private toTodo(todo: any) : Todo {
        if(!todo){
            return null;
        }
        return new Todo(todo._id,
            todo.name,
            todo.status,
            todo.createdAt,
            todo.userName,
            todo.lastUpdatedAt,
            todo.completedAt)
    }
}

