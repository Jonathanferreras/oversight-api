import { User } from '../user';

export interface IUserService {
  create(user: User): Promise<boolean>;
  find(email: string): Promise<User>;
  findAll(): Promise<User[]>;
}
