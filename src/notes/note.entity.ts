import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn  } from "typeorm";
import { User } from "../users/user.entity";

@Entity("notes")
export class Note {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    content: string

    @CreateDateColumn()
    createAt: Date

    @Column()
    userId : number

    @ManyToOne(() => User, (user) => user.notes)
    user:User
}