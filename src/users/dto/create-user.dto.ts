import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username : string

    @IsEmail()
    email : string

    @MinLength(6, {message : "password should be minimum 6 charactes long"})
    password: string
}