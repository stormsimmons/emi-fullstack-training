import { Status } from "../enum/Status";

export class Todo {
  constructor(
    public id: string,
    public name: string,
    public status: Status,
    public createdAt: Date,
    public userName: string,
    public lastUpdatedAt: Date,
    public completedAt: Date
  ) {}

  
}
