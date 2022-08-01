import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './Room';

@Entity('videos')
export class Video {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    url: string

    @ManyToOne(() => Room, room => room.videos)
    @JoinColumn({ name: 'roomId' })
    room: Room
}