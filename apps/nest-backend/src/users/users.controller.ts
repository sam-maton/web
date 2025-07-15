import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get('with-posts')
  async getUsersWithPosts() {
    return await this.usersService.getUsersWithPosts();
  }

  @Get('seed')
  async seedData() {
    return await this.usersService.seedData();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(parseInt(id));
  }
}
