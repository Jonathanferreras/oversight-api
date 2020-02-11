import { User } from "../user";

export interface IUserRepository {
  save(user: User): Promise<User>;
  find(email: string): Promise<User>;
  findAll(): Promise<User[]>
}