import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsString()
    @MinLength(10)
    description?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

}
