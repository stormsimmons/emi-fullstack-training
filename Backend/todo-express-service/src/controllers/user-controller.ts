import * as express from 'express';
import { UserRepository } from '../repositories/user-repository';
import { AuthService } from '../services/auth-service';
import { UserDto } from './dtos/user-dto';
import { User } from '../models/user';

export class UserController {

    constructor(private authService: AuthService, private userRepository: UserRepository) { }

    public buildRoutes(): express.Router {
        const router = express.Router();

        router.get('/user', async (req, res, next) => {
            let users = await this.userRepository.list()
            res.send(users.map(x => UserDto.fromUser(x)))
        })

        router.get('/user/:userName', async (req, res, next) => {
            res.send(UserDto.fromUser(await this.userRepository.getOne(req.params.userName)))
        })

        router.post('/user', async (req, res, next) => {
            let user = await this.userRepository.getOne(req.body.userName)
            if (user) {
                res.status(409).send("user already exists");
                return;
            }
            let newUser: UserDto = req.body
            let createdUser = await this.authService.register(new User(newUser.id, newUser.firstName, newUser.lastName, newUser.userName, newUser.password))
            res.status(200).send(createdUser);
        })
        return router;
    }

}