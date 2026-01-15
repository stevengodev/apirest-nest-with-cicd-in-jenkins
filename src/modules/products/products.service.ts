import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) { }

  async create(dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...dto,
      }
    })
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: { ...updateProductDto }
    });
  }

  async remove(id: string) {
    
    await this.findOne(id);

    this.prisma.product.delete({
      where: { id }
    });

  }
}
