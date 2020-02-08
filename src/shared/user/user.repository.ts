import { Injectable } from '@nestjs/common';
import { User } from './user';
import { IUserRepository } from './interfaces/user.repository.interface';

@Injectable()
export class UserMockRepository implements IUserRepository {
  db: User[];

  constructor() {
    this.db = [];
  }

  async save(user: User): Promise<User> {
    if (await this.find(user.email)) {
      throw new Error('User already exists!');
    }
    user.id = `${Math.floor(Math.random() * 1000)}`;
    this.db.push(user);
    console.log(this.db);

    return user;
  }

  async find(email: string): Promise<User> {
    const user = this.db.filter(dbUser => dbUser.email === email);

    if (!user) {
      return;
    }

    return user[0];
  }

  async findAll(): Promise<User[]> {
    return this.db;
  }
}
