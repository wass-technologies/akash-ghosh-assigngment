import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Order } from '../../order/entities/order.entity';
import { RestaurantStatus } from '../../constants/enums';
import{Menu} from '../../menu/entities/menu.entity';

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
  isActive: boolean; // Admin can activate/deactivate

  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];
  
  @ManyToOne(() => User, (user) => user.restaurants, { nullable: false })
  owner: User;
  @OneToMany(() => Menu, (menu) => menu.restaurant)
menus: Menu[];
}
