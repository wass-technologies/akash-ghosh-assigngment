import { IsEmail, IsEnum, IsNotEmpty, IsString,MinLength } from 'class-validator';
import { UserRole } from 'src/enum';  // Importing UserRole Enum

export class RegisterDto {
  @IsString()  
  @IsNotEmpty()  
  name: string;

  @IsEmail()  
  email: string;  

  @IsString()  
  @IsNotEmpty()  
  @MinLength(6, { message: 'Password must be at least 6 characters long' }) 
  password: string;  

  
  @IsEnum(UserRole, { message: 'Role must be one of ADMIN, RESTAURANT, CUSTOMER, STAFF' })  
  roles: UserRole;  
}