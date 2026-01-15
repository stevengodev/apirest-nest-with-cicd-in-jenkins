import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) { }

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: { ...dto }
    });
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;

  }

  async update(id: string, dto: UpdateCategoryDto) {

    this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: { ...dto }
    })
  }

  async remove(id: string) {
    await this.findOne(id);
    
    this.prisma.category.delete({
      where: { id }
    });

  }
}
