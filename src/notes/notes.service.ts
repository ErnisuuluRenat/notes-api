import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
    constructor(@InjectRepository(Note) private notesRepository: Repository<Note>) {}

    async findAll(sub : number): Promise<Note[]> {
        return await this.notesRepository.findBy({userId: sub})
    }

    async findOne(noteId: number, userId : number) : Promise<Note>{
        const note = await this.notesRepository.findOneBy({id : noteId})

        if (!note) {
            throw new NotFoundException()
        }

        if (note.userId !== userId) {
            throw new ForbiddenException()
        }

        return note
    }

    async create(sub: number, dto: CreateNoteDto) : Promise<Note>{
        const newNote = {
            ...dto,
            userId : sub
        }

        return await this.notesRepository.save(newNote)
    }

    async delete(noteId : number, userId: number) : Promise<void> {
        const note = await this.notesRepository.findOneBy({id : noteId})

        if (!note) {
            throw new NotFoundException()
        }

        if (note.userId !== userId) {
            throw new ForbiddenException()
        }

        await this.notesRepository.delete(noteId)
    }

    async update(noteId : number, userId : number, dto : UpdateNoteDto) : Promise<Note> {
        const note = await this.notesRepository.preload({id: noteId, ...dto})

        if (!note) {
            throw new NotFoundException()
        }

        if (note.userId !== userId) {
            throw new ForbiddenException()
        }

        return await this.notesRepository.save(note)
    }
}
