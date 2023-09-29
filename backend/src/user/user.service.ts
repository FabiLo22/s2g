import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  async getUser(username) {
    const user = await this.userRepository.findOne(username);
    
    if(!user) {
      throw new NotFoundException();
    }

    return user;
  }

  createUser() {
    const user = new User();
    user.username = 'testotest';
    this.userRepository.save(user);

    return user;
  }
}
