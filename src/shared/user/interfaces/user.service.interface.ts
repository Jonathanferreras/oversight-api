import { User } from "../user";

export interface IUserService {
  create(user: User): Promise<Boolean>;
  find(email: string): Promise<User>;
  findAll(): Promise<User[]>;
}