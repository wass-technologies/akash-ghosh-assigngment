import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderStatus } from '../constants/enums';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async create(orderData) {
    const order = this.orderRepo.create(orderData);
    return await this.orderRepo.save(order);
  }

  async updateStatus(id: number, status: OrderStatus) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');

    order.status = status;
    return await this.orderRepo.save(order);
  }

  async findAll() {
    return await this.orderRepo.find();
  }
}
