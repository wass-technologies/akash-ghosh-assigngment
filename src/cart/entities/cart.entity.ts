import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Menu } from '../../menu/entities/menu.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Menu, (menu) => menu.carts)
  menu: Menu;

  @Column()
  quantity: number;

  

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.cart)
  restaurant: Restaurant;
  @Column()
  restaurantId: number;
}
