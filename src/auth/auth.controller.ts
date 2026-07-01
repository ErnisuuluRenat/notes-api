import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post()
    login(@Body() dto: LoginAuthDto) {
        return this.authService.login(dto)
    }
}
