import { IsString, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username : string

    @ApiProperty()
    @IsEmail()
    email : string

    
    @ApiProperty()
    @MinLength(6, {message : "password should be minimum 6 charactes long"})
    password: string
}