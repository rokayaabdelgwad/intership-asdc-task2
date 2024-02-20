import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Patch } from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
   createUser(@Body() dot:UserDto){
    return this.userService.createUser(dot);
  }

  @Get('get-all-users')
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('get-user/:id')
   findOneUser(@Param('id') id: string) {
     return this.userService.findOne(parseInt(id, 10));
  
  }
  
  @Patch('update-user/:id')
   updateUser(@Param('id') id: string, @Body() bodyData: UpdateUserDto){
    return this.userService.update(parseInt(id, 10), bodyData);
  }

  @Delete('delete-user/:id')
    deleteUser(@Param('id') id: string){
    return this.userService.deleteUser(parseInt(id, 10));
  }}