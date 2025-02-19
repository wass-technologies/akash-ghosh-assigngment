import{Entity,PrimaryGeneratedColumn,Column} from 'typeorm';
export enum UserRole {
    ADMIN = 'admin',
    RESTAURANT = 'restaurant',
    CUSTOMER = 'customer',
}
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.CUSTOMER,
    })
    role: UserRole;
  
    @Column({ default: true })
    isActive: boolean; // To activate/deactivate user


}
