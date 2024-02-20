import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { UserDto } from './dto';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { CustomBadRequestException } from 'src/utils/custom.exceptions';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
  ) {}
  async createUser(dto: UserDto) {
    try {
      const email = dto.email.toString();
      const hash = await argon.hash(dto.password.toString());
      // Check if a user with the provided email already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new CustomBadRequestException(
          `User with email ${email} already exists`,
        );
      }
      // Create the new user if no user with the provided email exists
      const addedUser = await this.prisma.user.create({
        data: {
          email: email,
          hash: hash,
        },
      });
      if (addedUser.hasOwnProperty('hash')) {
        delete (addedUser as any).hash;
      }
      return addedUser;
    } catch (error) {
      if (error instanceof CustomBadRequestException) {
        throw error; // Re-throw the CustomBadRequestException
      } else {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  async findAllUsers() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error finded  users');
    }
  }

  async findOne(id: number) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return existingUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the CustomBadRequestException
      } else {
        throw new InternalServerErrorException('Error finded   user');
      }
    }
  }

  async update(id: number, userData: UpdateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const user = await this.prisma.user.update({
        where: { id },
        data: userData,
      });
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException
      } else {
        console.error('Error updating user:', error);
        throw new InternalServerErrorException('Error updated user');
      }
    }
  }

  async deleteUser(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        console.log(`User with ID ${id} not found`);
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      await this.prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException
      } else {
        console.error('Error updating user:', error);
        throw new InternalServerErrorException('Error deleted user');
      }
    }
  }
}
