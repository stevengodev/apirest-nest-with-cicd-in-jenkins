import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Esto evita importar PrismaModule en todos los módulos que usen PrismaService
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {



}
