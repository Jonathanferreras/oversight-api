import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class User {
  @IsString() readonly firstname: string;
  @IsString() readonly lastname: string;
  @IsEmail() readonly email: string;
  @IsString() readonly hash: string;
  @IsString() @IsOptional() id?: string;
  @IsBoolean() @IsOptional() isLoggedIn?: boolean;
}
