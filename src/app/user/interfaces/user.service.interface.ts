import { User } from '../user';

export interface IUserService {
  handleCreateUser(user: User): Promise<boolean>;
  handleFindUser(email: string): Promise<User>;
  handleFindAllUsers(): Promise<User[]>;
}
