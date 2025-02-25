import { Injectable, NotFoundException,ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import { UserRole } from '../constants/enums';


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
async getAllMenus() {
  return await this.menuRepo.find({ relations: ['restaurant'] });
}
// View menu by restaurant ID
async getMenuByRestaurant(restaurantId: number) {
  const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId } });
  if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
  }

  return await this.menuRepo.find({ where: { restaurant: { id: restaurantId } } });
}


  
// Update menu item (Only restaurant owner)


async updateMenuItem(menuId: number, updateData: UpdateMenuDto, user: any) {
  const menuItem = await this.menuRepo.findOne({ where: { id: menuId } });

  if (!menuItem) {
    throw new NotFoundException('Menu item not found');
  }
  const restaurant = await this.restaurantRepo.findOne({ where: { id: menuItem.restaurantId } });

  if (!restaurant) {
    throw new NotFoundException('Restaurant not found');
  }

  if (
    user.role !== UserRole.RESTAURANT || 
    user.userId !== menuItem.restaurant?.ownerId )// Ensure `ownerId` is used correctly
  {
    throw new ForbiddenException('You can only delete your own menu items');
  }
  await this.menuRepo.update(menuId, updateData);

  return { message: 'Menu item updated successfully' };
}



// Delete menu item (Only restaurant owner)
 async deleteMenuItem(id: number, user: any) {
  const menuItem = await this.menuRepo.findOne({ where: { id }, relations: ['restaurant'] });

  if (!menuItem) {
      throw new NotFoundException('Menu item not found');
  }

  if (
    user.role !== UserRole.RESTAURANT || 
    user.userId !== menuItem.restaurant?.ownerId )
  {
    throw new ForbiddenException('You can only delete your own menu items');
  }
  

  await this.menuRepo.delete(id);

  return { message: 'Menu item deleted successfully' };
}

}