import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post()
    login(@Body() dto: LoginAuthDto) {
        return this.authService.login(dto)
    }

    @Post('/refresh')
    refresh(@Body() dto: RefreshDto){
        return this.authService.refresh(dto)
    }
}
