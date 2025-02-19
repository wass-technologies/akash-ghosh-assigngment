import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Enum for user roles
export enum UserRole {
  ADMIN = 'admin',
  RESTAURANT = 'restaurant',
  CUSTOMER = 'customer',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;  // Primary key

  @Column()
  name: string;  // User's name

  @Column()
  email: string;  // User's email

  @Column()
  password: string;  // User's password

  @Column({
    type: 'enum',  // Specify that this column will be an enum type
    enum: UserRole,  // Referencing the UserRole enum
    default: UserRole.CUSTOMER,  // Default role will be customer
  })
  role: UserRole;  // User's role based on the UserRole enum
}
