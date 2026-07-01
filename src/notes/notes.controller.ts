import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotesService } from './notes.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
    constructor(private notesService: NotesService) {}

    @Get()
    findAll(@CurrentUser() user : any) {
        return this.notesService.findAll(user.sub)
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id : number, @CurrentUser() user : any) {
        return this.notesService.findOne(id, user.sub)
    }

    @Post()
    create(@CurrentUser() user : any, @Body() dto : CreateNoteDto){
        return this.notesService.create(user.sub, dto)
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id :number, @CurrentUser() user : any) {
        return this.notesService.delete(id, user.sub)
    }

    @Patch(":id")
    update(@Param("id", ParseIntPipe) id : number, @CurrentUser() user : any,@Body() dto : UpdateNoteDto) {
        return this.notesService.update(id, user.sub, dto)
    }
}
