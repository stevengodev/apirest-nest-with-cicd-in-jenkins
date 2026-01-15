import { ProductStatus } from '@prisma/client';
import { IsString, MinLength, IsNumber, Min, IsUUID, IsNotEmpty, IsOptional, IsPositive, IsInt, IsEnum } from 'class-validator';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsInt()
    @Min(0)
    stock: number;

    @IsNotEmpty()
    @IsEnum(ProductStatus)
    status: ProductStatus;

    @IsUUID()
    @IsString()
    categoryId: string;

}
