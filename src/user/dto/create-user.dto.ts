import { IsEmail, IsEnum, IsNotEmpty, IsString,MinLength } from 'class-validator';
import { UserRole } from '../../constants/enums';  // Importing UserRole Enum

export class CreateUserDto {
  @IsString()  
  @IsNotEmpty()  
  name: string;  
  @IsEmail()  
  email: string;  

  @IsString()  
  @IsNotEmpty()  
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) 
  password: string;  

  @IsEnum(UserRole)  
  role: UserRole;  
}
