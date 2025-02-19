import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { OrderStatus } from '../../constants/enums';
import { User } from '../../user/entities/user.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;

  @Column()
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;
}
