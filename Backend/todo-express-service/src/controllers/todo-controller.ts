import * as express from 'express';
import { TodoRepository } from '../repositories/todo-respository';
import { TodoDto } from './dtos/todo-dto';
import { Todo } from '../models/todo';
import { TokenValidation } from '../middleware/token-validation';
export class TodoController{

    constructor(private todoRepository:TodoRepository) { }

    public buildRoutes(): express.Router {
        const router = express.Router();

        router.use(TokenValidation.authenticate)

        router.get('/todo', async (req,res,next)=> {
            let todos = await this.todoRepository.list()
            res.send(todos.map(x => TodoDto.fromTodo(x)))
        })

        router.get('/todo/:id', async (req,res,next)=> {
            res.send(TodoDto.fromTodo(await this.todoRepository.getOne(req.params.id)))
        })

        router.get('/todo/user/:userName', async (req,res,next)=> {
            let todos = await this.todoRepository.listByUser(req.params.userName)
            res.send(todos.map(x => TodoDto.fromTodo(x)))
        })

        router.delete('/todo/:id', async (req,res,next)=> {
            res.send(await this.todoRepository.delete(req.params.id))
        })
        
        router.put('/todo', async (req,res,next)=> {
            let todo: TodoDto = req.body
            res.send(await this.todoRepository.update(this.mapToTodo(todo)))
        })
        router.post('/todo', async (req,res,next)=> {
            let todo: TodoDto = req.body
            res.send(await this.todoRepository.insert(this.mapToTodo(todo)))
        })

        return router;
    }

    private mapToTodo(todo:TodoDto){
        return new Todo(todo.id,
            todo.name,
            todo.status,
            todo.createdAt,
            todo.userName,
            todo.lastUpdatedAt,
            todo.completedAt)
    }

}