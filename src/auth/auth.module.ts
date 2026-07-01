import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService : ConfigService) => ({
      global:true,
      secret:configService.get<string>('SECRET_KEY'),
      signOptions: {expiresIn: '1d'}
    }),
    inject: [ConfigService]
  }), UsersModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthGuard, JwtModule]
})
export class AuthModule {}
