import { ObjectID } from "mongodb";
import { Status } from "../../enum/status";
import { Todo } from "../../models/todo";

export class TodoDto {
    constructor(
        public id: string | ObjectID,
        public name: string,
        public status: Status,
        public createdAt: Date,
        public userName: string,
        public lastUpdatedAt: Date,
        public completedAt: Date
    ) { }

    public static fromTodo(todo: Todo) {
        return new TodoDto(todo._id,
            todo.name,
            todo.status,
            todo.createdAt,
            todo.userName,
            todo.lastUpdatedAt,
            todo.completedAt)
    }

}
