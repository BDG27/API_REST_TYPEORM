import { Request, Response } from 'express';
import { RoomRepository } from '../typeorm/repositories/RoomRepository';

export class RoomController {
    async create(req: Request, res: Response){
        const { name, description } = req.body;

        try {

            const newRoom = RoomRepository.create({
                name,
                description
            });

            await RoomRepository.save(newRoom);

            return res.status(201).json(newRoom);
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }
    }

    async findAll(req: Request, res: Response){

        try {

            const rooms = await RoomRepository.find({
                relations: {
                    subjects: true,
                    videos: true
                }
            });

            return res.status(200).json(rooms);
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }
    }
}