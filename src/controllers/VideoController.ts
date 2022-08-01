import { Request, Response } from 'express';
import { RoomRepository } from '../typeorm/repositories/RoomRepository';
import { VideoRepository } from '../typeorm/repositories/VideoRepository';

export class VideoController {
    async create(req: Request, res: Response){
        const { title, url, roomId } = req.body

        try {

            const room = await RoomRepository.findOneBy({ id: Number(roomId) });

            if(!room){
                return res.status(404).json({ msg: 'Essa aula não existe' })
            }

            const newVideo = VideoRepository.create({
                title,
                url,
                room
            });

            await VideoRepository.save(newVideo);
            
            return res.status(201).json(newVideo);
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({msg: 'Internal Server Error'});
        }

    }
}