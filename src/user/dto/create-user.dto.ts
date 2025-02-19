import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../constants/enums';  // Importing UserRole Enum

export class CreateUserDto {
  @IsString()  // Ensures name is a string
  @IsNotEmpty()  // Ensures name is not empty
  name: string;  // User's name

  @IsEmail()  // Ensures valid email format
  email: string;  // User's email

  @IsString()  // Ensures password is a string
  @IsNotEmpty()  // Ensures password is not empty
  password: string;  // User's password

  @IsEnum(UserRole)  // Ensures role matches one of the values in UserRole Enum
  role: UserRole;  // User's role (Admin, Customer, Restaurant)
}
