
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';


export class UpdateUserDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsString()
    email: string;

    @ApiProperty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

}
