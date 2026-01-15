import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength, MaxLength } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'El email del usuario', example: 'jhonwick@gmail.com' })
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({ description: 'La contraseña del usuario', example: 'jhonwick123' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    password: string;
}