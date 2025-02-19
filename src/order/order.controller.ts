import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus } from '../constants/enums';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() orderData) {
    return this.orderService.create(orderData);
  }

  @Patch(':id/status')
  updateOrderStatus(@Param('id') id: number, @Body('status') status: OrderStatus) {
    return this.orderService.updateStatus(id, status);
  }

  @Get()
  getAllOrders() {
    return this.orderService.findAll();
  }
}
