import { IsString, MinLength, MaxLength, IsNumber, Min, IsUUID, IsOptional, IsPositive, IsInt } from 'class-validator';

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    @MinLength(3)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    price?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    stock?: number;

    @IsOptional()
    @IsString()
    categoryId?: string;

}
