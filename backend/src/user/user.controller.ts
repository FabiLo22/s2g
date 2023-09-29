import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private user: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.user.getUsers();
  }

  @Get(':username')
  async getUser(@Param('username') username): Promise<User> {
    return await this.user.getUser(username);
  }
  
  @Get('create')
  async createUser(): Promise<User> {
    return this.user.createUser();
  }
}
