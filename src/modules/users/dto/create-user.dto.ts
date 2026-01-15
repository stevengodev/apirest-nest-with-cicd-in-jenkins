import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({ description: 'El nombre del usuario', example: 'Jhon' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'El apellido del usuario', example: 'Wick' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty({ description: 'El email del usuario', example: 'jhonwick@gmail.com'})
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty({ description: 'La contraseña del usuario', example: 'jhon123' })
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    password: string;

}
