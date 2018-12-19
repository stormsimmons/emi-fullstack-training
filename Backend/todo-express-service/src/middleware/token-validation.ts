import * as express from 'express';
import * as jwt from 'jsonwebtoken';

export class TokenValidation{
    public static authenticate(req: express.Request,res:express.Response, next:express.NextFunction){
        let authHeader = req.headers.authorization;

        if (!authHeader){
            res.status(401).send("Unathorized");
            return;
        }

        let token = authHeader.substring('Bearer '.length)
        
        if (!token){
            res.status(401).send("Unathorized");
            return;
        }

        let key = "XCAP05H6LoKvbRRa/QkqLNMI7cOHguaRyHzyg7n5qEkGjQmtBhz4SzYh4Fqwjyi3KJHlSXKPwVu2+bXr6CtpgQ=="

        try{
        let result = jwt.verify(token,key)
        }catch(err){
            res.status(401).send("Unathorized");
            return;
        }
        next();
    }
}