import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [UsersModule, ProductsModule, PrismaModule, AuthModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('auth');
  }


}
