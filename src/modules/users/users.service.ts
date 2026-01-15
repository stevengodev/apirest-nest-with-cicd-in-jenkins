import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) {}

  async create( dto : CreateUserDto) {
    
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data : { 
        ...dto,
        password: hashedPassword
       }
    });
    
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    // De cada usuario, extrae el resto de las propiedades excepto password
    const results = users.map(({ password, ...rest }) => rest);

    return results;
  }

  async findOne(id: string) {
    
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...result } = user;

    return result;

  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto }
    })
  }

  async remove(id: string) {

    await this.findOne(id);
    
    this.prisma.user.delete({
      where: { id }
    });

  }
}
