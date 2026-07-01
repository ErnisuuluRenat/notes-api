import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async create(dto : CreateUserDto) : Promise<Omit<CreateUserDto, "password">>{
        const saltRounds = 10
        const hash = await bcrypt.hash(dto.password, saltRounds)

        const user = {
            ...dto,
            password: hash
        }

        await this.userRepository.save(user)

        const {password, ...userWithoutPassword} = user

        return userWithoutPassword
    }

    async findByUsername(username: string) {
        const user = await this.userRepository.findOneBy({username})

        if(!user) {
            throw new NotFoundException(`User by username: ${username} does not exists`)
        }

        return user
    }
}
