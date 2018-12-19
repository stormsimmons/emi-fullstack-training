import { Status } from "../enum/status";
import { ObjectID } from "mongodb";

export class Todo {
  constructor(
    public _id: string | ObjectID,
    public name: string,
    public status: Status,
    public createdAt: Date,
    public userName: string,
    public lastUpdatedAt: Date,
    public completedAt: Date
  ) {}

  
}
