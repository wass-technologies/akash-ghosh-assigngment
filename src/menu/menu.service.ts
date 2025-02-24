import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepo: Repository<Menu>,
    
    @InjectRepository(Restaurant)
    private restaurantRepo: Repository<Restaurant>
  ) {}

  async addMenuItem(menuDto: CreateMenuDto) {
    const { restaurantId, item_name, price, description, isAvailable } = menuDto;

    
    const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId } });

    if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
    }

    
    const menuItem = this.menuRepo.create({
        item_name,
        price,
        description,
        isAvailable,
        restaurant,
    });

    return await this.menuRepo.save(menuItem);
}

}