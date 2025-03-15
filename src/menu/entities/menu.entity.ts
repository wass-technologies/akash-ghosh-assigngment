// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
// import { Restaurant } from '../../restaurant/entities/restaurant.entity';
// //import { Cart } from '../../cart/entities/cart.entity';
// import { AvailabilityStatus } from 'src/enum';

// @Entity()
// export class Menu {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   item_name: string;

//   @Column('decimal')
//   price: number;

//   @Column()
//   description: string;
  
//   @Column()
//   restaurantId: number; 

//   @Column({
//     type: 'enum',
//     enum: AvailabilityStatus,
//     default: AvailabilityStatus.AVAILABLE,
//   })
//   availability: AvailabilityStatus;


//   @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, { onDelete: 'CASCADE' })
//   restaurant: Restaurant;

// //   @OneToMany(() => Cart, (cart) => cart.menu)
// //   carts: Cart[];
// }

