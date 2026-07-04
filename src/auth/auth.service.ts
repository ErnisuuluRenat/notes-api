import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto} from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
    constructor(private usersService : UsersService,private jwtService: JwtService) {}

    async login(dto : LoginAuthDto){
        const user = await this.usersService.findByUsername(dto.username)

        const isMatch = await bcrypt.compare(dto.password, user.password)

        if(!isMatch) {
            throw new UnauthorizedException("Invalid credentials")
        }

        const payload = {sub : user.id, email: user.email, username: user.username}

        const saltRounds = 10

        const rawRefreshToken = await this.jwtService.signAsync(payload, {expiresIn : '30d'})

        const refreshToken = await bcrypt.hash(rawRefreshToken, saltRounds)

        await this.usersService.updateRefreshToken(user.id, refreshToken)

        const access_token = await this.jwtService.signAsync(payload)

        return {access_token, refresh_token: rawRefreshToken}
    }

    async refresh(dto: RefreshDto){
        const {refresh_token} = dto

        try {
            const decodedRefreshToken =  await this.jwtService.verifyAsync(refresh_token)

            const {sub} = decodedRefreshToken

            const user = await this.usersService.findById(sub)

            if (!user.refreshToken) {
                throw new UnauthorizedException()
            }

            const isMatch = await bcrypt.compare(refresh_token, user.refreshToken)

            if (!isMatch) {
            throw new UnauthorizedException()
            }

            const payload = {sub : user.id, email: user.email, username: user.username}

            const access_token = await this.jwtService.signAsync(payload, {"expiresIn" : "1h"})

            return {access_token}
        } catch{
            throw new UnauthorizedException()
        }
    }

    async logout(userId: number) {
        const user = await this.usersService.findById(userId)

        await this.usersService.updateRefreshToken(user.id, null)
    }
}
