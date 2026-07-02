import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Note } from "../notes/note.entity";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    email: string

    @Column({nullable: true})
    refreshToken: string

    @OneToMany(() => Note, (note) => note.user)
    notes: Note[];
}