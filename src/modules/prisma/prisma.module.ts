import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from '../user/user.service';
@Global()
@Module({
    imports:[],
    providers: [PrismaService,UserService],
    exports: [PrismaService]
})
export class PrismaModule {}

