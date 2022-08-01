import { Request, Response } from 'express';
import { RoomRepository } from '../typeorm/repositories/RoomRepository';
import { SubjectRepository } from '../typeorm/repositories/SubjectRepository';

export class RoomSubjectController {
    async create(req: Request, res: Response){
        const { roomId, subjectId } = req.body

        try {

            const room = await RoomRepository.findOneBy({ id: Number(roomId) });

            if(!room){
                return res.status(404).json({ msg: 'Essa aula não existe' })
            }

            const subject = await SubjectRepository.findOneBy({ id: Number(subjectId) });

            if(!subject){
                return res.status(404).json({ msg: 'Essa aula não existe' })
            }

            const roomUpdate = {
                ...room,
                subjects: [subject],
            }

            await RoomRepository.save(roomUpdate);

            return res.status(204).send();
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }

    }

}