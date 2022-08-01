import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../typeorm/repositories/UserRepository';

type JwtPayload = {
    id: number
}

export const authUser = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

        try {

            if(!authorization){
                return res.status(401).json({ msg: "Não autorizado" });
            }
    
            const tokenRaw = authorization.split(' ');
            const tokenJWT = tokenRaw[1];
    
            jwt.verify(tokenJWT, process.env.JWT_SECRET_KEY ?? '', async(error, data) => {
                if(error){
                    return res.status(401).json({ msg: "Não autorizado" });
                }

                const dataToken = data as JwtPayload;
                
                var userId = dataToken.id;
                
                const user = await UserRepository.findOneBy({id: userId});

                if(!user){
                    return res.status(401).json({ msg: "Não autorizado" });
                }
                
                const {password: _, ...userLogged} = user;
                
                req.user = userLogged;

                next();

            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }
}