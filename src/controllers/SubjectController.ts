import { Request, Response } from 'express';
import { SubjectRepository } from '../typeorm/repositories/SubjectRepository';

export class SubjectController {
    async create(req: Request, res: Response){
        const { name } = req.body
        if(!name) {
            return res.status(400).json({msg: "Nome obrigatorio"})
        }

        try {

            const newSubject = SubjectRepository.create({
                name
            });

            await SubjectRepository.save(newSubject);
            
            return res.status(201).json(newSubject);
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }

    }
}