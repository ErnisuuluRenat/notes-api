import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private usersService : UsersService,private jwtService: JwtService) {}

    async login(dto : LoginAuthDto){
        const foundUser = await this.usersService.findByUsername(dto.username)

        const isMatch = await bcrypt.compare(dto.password, foundUser.password)

        if(!isMatch) {
            throw new UnauthorizedException("Invalid credentials")
        }

        const payload = {sub : foundUser.id, email: foundUser.email, username: foundUser.username}
        return {access_token : await this.jwtService.signAsync(payload)}
    }
}
