import { Injectable } from '@nestjs/common';
import { User } from './user';
import { UserMockRepository as UserRepository } from './user.repository';
import { IUserService } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async handleCreateUser(user: User): Promise<boolean> {
    const newUser = this.userRepository.save(user);

    return (newUser ? true : false);
  }

  async handleFindUser(email: string): Promise<User> {
    return await this.userRepository.find(email);
  }

  async handleFindAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
