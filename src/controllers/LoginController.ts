import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../typeorm/repositories/UserRepository';

export class LoginController {
    async login(req: Request, res: Response){
        const { email, password } = req.body;

        try {
            const user = await UserRepository.findOneBy({email})

            if(!user){
                return res.status(200).json({ msg: "E-mail ou senha inválidos" });
            }

            var passwordWithSalt = password + process.env.BCRYPT_SECRET_KEY;
            const verifyPWD = await bcrypt.compare(passwordWithSalt, user.password);

            if(!verifyPWD) {
                return res.status(200).json({ msg: "E-mail ou senha inválidos" });
            }

            const tokenJWT = jwt.sign({id: user.id}, 
                process.env.JWT_SECRET_KEY ?? '', 
                {
                    expiresIn: '8h'
                }
            );

            const {password: _, ...userLogged} = user 

            return res.status(200).json({
                userLogged,
                token: tokenJWT
            });
            

        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }
        
    }
}