import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    name?: string;  // Optional: User's name for updating

    email?: string;  // Optional: User's email for updating
  
    password?: string;  // Optional: User's password for updating
  
    role?: UserRole; 
          
}
