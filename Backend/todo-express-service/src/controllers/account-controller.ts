import { AuthService } from "../services/auth-service";
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRepository } from "../repositories/user-repository";
import { User } from "../models/user";

export class AccountController {
    constructor(private authService: AuthService, private userRepository:UserRepository) { }

    public buildRoutes(): express.Router {
        const router = express.Router();

        router.post('/account/login', async (req,res,next)=> {
            let result = await this.authService.varifyCredentials(req.body.username,req.body.password)
            if(result !== "Valid"){
                res.status(401).send(result)
                return;
            }

            let user = await this.userRepository.getOne(req.body.username)
            let token = this.getJwt(user)
            res.status(200).send({accessToken: token})
        })

        
        return router;
    }


    private getJwt(user:User):string{
        let payload = {
            user_name : user.userName,
			first_name: user.firstName,
			last_name: user.lastName,
			sub:user._id,
        }

        let key = "XCAP05H6LoKvbRRa/QkqLNMI7cOHguaRyHzyg7n5qEkGjQmtBhz4SzYh4Fqwjyi3KJHlSXKPwVu2+bXr6CtpgQ=="

        return jwt.sign(payload,key, {expiresIn: 60*60*2})
    }
}