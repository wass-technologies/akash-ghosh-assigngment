import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderStatus } from '../constants/enums';

@Controller('orders')
export class OrderController {
  
}
