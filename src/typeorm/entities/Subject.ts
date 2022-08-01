import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from './Room';

@Entity('subjects')
export class Subject {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Room, romm => romm.subjects)
    @JoinTable({
        name: 'room_subject',
        joinColumn: {
            name: 'room_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'subject_id',
            referencedColumnName: 'id'
        }
    })
    rooms: Room[]
}