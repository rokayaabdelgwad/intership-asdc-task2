import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),AuthModule],
  controllers: [UserController],
  providers: [UserService, PrismaService ],
})
export class AppModule {}
