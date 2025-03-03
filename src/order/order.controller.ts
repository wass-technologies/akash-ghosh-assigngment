import { Controller, Post, Get, Body, Param, Patch ,Req, Request,UnauthorizedException} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/Auth/Gurd/auth.guard';
import { RolesGuard } from 'src/Auth/Gurd/roles.guard';
import { Roles } from 'src/Auth/Gurd/roles.decorator';
import { Repository } from "typeorm";
import{UseGuards} from '@nestjs/common';
import { UserRole } from 'src/constants/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { OrderStatus } from 'src/constants/enums';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService,
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>
  ) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CUSTOMER) 
@Post("place")
async placeOrder(@Request() req) {
  return this.orderService.placeOrder(req.user.userId);
}


@UseGuards(JwtAuthGuard, RolesGuard)
@Get('restaurant-orders')
  @Roles(UserRole.RESTAURANT) 
  async getRestaurantOrders(@Request() req) {
    console.log("id",req.user.userId);
    return this.orderService.getRestaurantOrders(req.user.userId);
}
@Patch(':id/status')
@UseGuards(JwtAuthGuard, RolesGuard) 
@Roles(UserRole.RESTAURANT) 
async updateOrderStatus(
  @Param('id') orderId: number, 
  @Body('status') newStatus: OrderStatus,
  @Req() req
) {
    const ownerId = req.user.userId; 
    return this.orderService.updateOrderStatus(orderId, newStatus, ownerId);
}

@Get(':id/status')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CUSTOMER) 
async getOrderStatus(@Param('id') orderId: number, @Req() req) {
  if (!req.user) {
    throw new UnauthorizedException('User not authenticated');
  }

  const userId = req.user.userId; 
  return this.orderService.getOrderStatus(orderId, userId);
}

}
