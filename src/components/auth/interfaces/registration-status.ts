import { IsBoolean, IsString } from "class-validator";

export class RegistrationStatus {
  @IsBoolean() success: boolean;
  @IsString() message: string;
}