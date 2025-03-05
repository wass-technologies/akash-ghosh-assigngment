import { Injectable, NotFoundException ,Req,ForbiddenException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cart } from '../cart/entities/cart.entity';
import { User } from '../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';
import{Restaurant} from '../restaurant/entities/restaurant.entity';
import { Order } from 'src/order/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '../enums'
import { console } from 'inspector';
import { omit } from 'lodash';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(Menu) private menuRepo: Repository<Menu>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Restaurant) private restaurantRepo: Repository<Restaurant>
  ) {}
// order place 
  async placeOrder(userId: number): Promise<Order> {
    console.log(userId);
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');

    }
    const userWithoutPassword = omit(user, ['password']);
    const cartItems = await this.cartRepo.find({ 
      where: { user: { id: userId } },  
      relations: ['menu', 'restaurant']  
    });
    const allCartItems = await this.cartRepo.find();
    if (!cartItems || cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }
    const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.totalPrice), 0);
    
    const order = this.orderRepo.create({
      user:userWithoutPassword,
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

    await this.cartRepo.delete({ user: { id: userId } });


    return order;
  }
  // get Restaurant order 
  async getRestaurantOrders(ownerId: number) {
    
    const restaurant = await this.restaurantRepo.findOne({
      where: { owner: { id: ownerId } },
      relations: ['owner'],
    });

    if (!restaurant) {
      throw new NotFoundException('No restaurant found for this owner.');
    }

    const orders = await this.orderRepo.find({
      where: { restaurant: { id: restaurant.id } },
      relations: ['restaurant'], 
    });

   
    const totalOrders = await this.orderRepo.count({
      where: { restaurant: { id: restaurant.id } },
    });

  
    return {
      totalOrders, 
      orders,      
    };
}

// update order status by res
async updateOrderStatus(orderId: number, newStatus: OrderStatus, ownerId: number) {
  const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['restaurant', 'restaurant.owner'],
  });

  if (!order) {
      throw new NotFoundException('Order not found');
  }

  // Ensure only the restaurant owner can update the order status
  if (order.restaurant.owner.id !== ownerId) {
      throw new ForbiddenException('You are not authorized to update this order');
  }

  order.status = newStatus;
  await this.orderRepo.save(order);

  // Return only order status and restaurant details
  return {
      orderId: order.id,
      status: order.status,
      restaurant: {
          id: order.restaurant.id,
          name: order.restaurant.name,
          email: order.restaurant.email,
          isActive: order.restaurant.isActive,
      }
  };
}
// view order status for customer
async getOrderStatus(orderId: number, userId: number) {
  const order = await this.orderRepo.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: ['user', 'restaurant'],
  });

  if (!order) {
      throw new NotFoundException('Order not found');
  }

  return { orderId: order.id, status: order.status };
}


  }
  
  

      




