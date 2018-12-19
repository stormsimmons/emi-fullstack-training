import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser'
import { TodoRepository } from './repositories/todo-respository';
import { UserRepository } from './repositories/user-repository';
import { AuthService } from './services/auth-service';
import { AccountController } from './controllers/account-controller';
import { UserController } from './controllers/user-controller';
import { TodoController } from './controllers/todo-controller';

const app: express.Express = express();

// configuring middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const todoRepo: TodoRepository = new TodoRepository();
const userRepository: UserRepository = new UserRepository();
const authService: AuthService = new AuthService(userRepository);
const accountControler :AccountController = new AccountController(authService,userRepository)
const userControler :UserController = new UserController(authService ,userRepository)
const todoControler :TodoController = new TodoController(todoRepo)


app.use('/api',accountControler.buildRoutes())
app.use('/api',userControler.buildRoutes())
app.use('/api',todoControler.buildRoutes())

app.listen(4000, () => console.log("Server is running on port 4000.."));