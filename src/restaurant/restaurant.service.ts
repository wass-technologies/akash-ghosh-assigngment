import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async findAll() {
    return await this.restaurantRepo.find();
  }

  async activate(id: number) {
    const restaurant = await this.restaurantRepo.findOne({ where: { id } });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    restaurant.isActive = true;
    return await this.restaurantRepo.save(restaurant);
  }

  async deactivate(id: number) {
    const restaurant = await this.restaurantRepo.findOne({ where: { id } });
    if (!restaurant) throw new NotFoundException('Restaurant not found');

    restaurant.isActive = false;
    return await this.restaurantRepo.save(restaurant);
  }
}
