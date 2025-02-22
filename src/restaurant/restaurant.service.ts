import { Injectable, NotFoundException,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { UserRole } from '../constants/enums';
import { User } from '../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant,)
    
    private readonly restaurantRepo: Repository<Restaurant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Menu)  // Inject Menu Repository
    private readonly menuRepo: Repository<Menu>,
  ) {}


  
  
   
   async findAllRestaurants() {
    return await this.userRepository.find({
      where: { role: UserRole.RESTAURANT },
    });
  }
  async createMenu(restaurantId: number, menuData: any) {
    const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId } });
  
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
  
    const menu = this.menuRepo.create({
      ...menuData,
      restaurant,
    });
    return await this.menuRepo.save(menu);
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
