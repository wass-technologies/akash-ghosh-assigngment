import { Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UserRole,PermissionAction } from '../enums';
import { User } from '../user/entities/user.entity';
import { RestaurantStatus } from '../enums';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';


@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant,)
    
    private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    
  ) {}

  // crete a new restaurant
  async create(restaurantData: Partial<Restaurant>) {
    const restaurant = this.restaurantRepo.create(restaurantData);
    return await this.restaurantRepo.save(restaurant);
  }
  // get the status of the restaurant
  async getRestaurantStatus(id: number) {
    const restaurant = await this.restaurantRepo.findOne({ where: { id } });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    return {
      id: restaurant.id,
      name: restaurant.name,
      isActive: restaurant.isActive,
      message: restaurant.isActive ? 'Restaurant is active' : 'Restaurant is inactive',
    };
  }

  async getActiveRestaurants() {
    return await this.restaurantRepo.find({ where: { isActive: true } });
  }

// find menu foe admin
  async getMenuByRestaurantForAdmin(restaurantId: number) {
    const restaurant = await this.restaurantRepo.findOne({
      where: { id: restaurantId },
      relations: ['menus'],
    });
  
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
  
    return restaurant.menus; 
  }
  
  async setRestaurantStatus(id: number, isActive: boolean) {
    const restaurant = await this.restaurantRepo.findOne({ where: { id } });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }

    const newStatus = isActive ? RestaurantStatus.Active : RestaurantStatus.Inactive;

  await this.restaurantRepo.update(id, { 
    isActive: isActive, 
    status: newStatus 
  });

    return {
      message: isActive ? 'Restaurant activated successfully' : 'Restaurant deactivated successfully',
      restaurantId: restaurant.id,
      status: newStatus
    
    };
  }

  async findAllRestaurants() {
    return await this.restaurantRepo.find();
  }
}