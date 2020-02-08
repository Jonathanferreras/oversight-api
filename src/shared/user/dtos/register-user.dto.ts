import { IsString, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsString() readonly firstname: string;
  @IsString() readonly lastname: string;
  @IsEmail() readonly email: string;
  @IsString() readonly password: string;
}
