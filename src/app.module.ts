import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { PrismaService } from './modules/prisma/prisma.service';
import { LoggerModule } from './modules/logger/logger.module';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule,LoggerModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule {}
