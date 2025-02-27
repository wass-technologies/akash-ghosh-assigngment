import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../order/entities/order.entity';
import { Cart } from '../cart/entities/cart.entity';
import { User } from '../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';
import{Restaurant} from '../restaurant/entities/restaurant.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Restaurant) private restaurantRepo: Repository<Restaurant>
  ) {}

  async placeOrder(userId: number): Promise<Order> {
    
    const cartItems = await this.cartRepo.find({ 
      where: { user: { id: userId } }, 
      relations: ['menu', 'user', 'restaurant'] 
    });

    if (!cartItems || cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    
    const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.totalPrice), 0);

    // Create order with menu 
    const order = this.orderRepo.create({
      user: cartItems[0].user,
      restaurant: cartItems[0].restaurant,
      items: cartItems.map((item) => ({
        menuId: item.menu.id,
        menuName: item.menu.item_name, 
        quantity: item.quantity,
        totalPrice: item.totalPrice,
      })),
      totalAmount,
      status: 'Pending',
    });

    await this.orderRepo.save(order);

    await this.cartRepo.createQueryBuilder()
    .delete()
    .where("userId = :userId", { userId })
    .execute();

    return order;
  }
}
