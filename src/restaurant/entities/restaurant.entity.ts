import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { RestaurantStatus } from '../../constants/enums';
import{Menu} from '../../menu/entities/menu.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Restaurant {
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
    enum: RestaurantStatus,
    default: RestaurantStatus.Inactive,
  })
  status: RestaurantStatus; 

  @Column({ default: false }) 
  isActive: boolean; 


  
  
  @ManyToOne(() => User, (user) => user.restaurants, { nullable: false })
  owner: User;

  @Column()
  ownerId: number; 
  @OneToMany(() => Menu, (menu) => menu.restaurant)
menus: Menu[];
@OneToMany(() => Cart, (cart) => cart.restaurant)
cart: Cart[];
@OneToMany(() => Order, (order) => order.restaurant)
orders: Order[]; 
}
