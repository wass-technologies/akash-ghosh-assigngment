import { Entity, PrimaryGeneratedColumn, Column, OneToMany, } from 'typeorm';
import { UserRole } from '../../constants/enums';
import { Order } from 'src/order/entities/order.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;  // Primary key

  @Column()
  name: string;  // User's name

  @Column()

  email: string;  // User's email

  @Column()
  @Exclude()
  password: string;  // User's password

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  role: UserRole;


  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[]; 

  @OneToMany(() => Cart, (cart) => cart.user)
carts: Cart[];
}

