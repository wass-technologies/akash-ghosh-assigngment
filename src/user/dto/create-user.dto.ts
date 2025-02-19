import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  name: string;  // User's name

  email: string;  // User's email

  password: string;  // User's password

  role: UserRole;  // User's role (enum used here for validation)
}
