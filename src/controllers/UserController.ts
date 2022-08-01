import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserRepository } from '../typeorm/repositories/UserRepository';

export class UserController {
    async create(req: Request, res: Response){
        const { name, email, password } = req.body;

        try {
            const userExists = await UserRepository.findOneBy({email})

            if(userExists){
                return res.status(400).json({ msg: "Email já cadastrado" });
            }

            var passwordWithSalt = password + process.env.BCRYPT_SECRET_KEY;
            const hashPWD = await bcrypt.hash(passwordWithSalt, 11);

            const newUser = UserRepository.create({
                name,
                email,
                password: hashPWD
            }); 

            await UserRepository.save(newUser);

            const {password: _,name: __, ...user} = newUser;

            return res.status(201).json(user);

        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }
        
    }

    async getProfile(req: Request, res: Response){
        return res.json(req.user)
    }
}