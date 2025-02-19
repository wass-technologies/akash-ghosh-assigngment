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
    private menuRepository: Repository<Menu>,
    
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: createMenuDto.restaurantId },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const menu = this.menuRepository.create({ ...createMenuDto, restaurant });
    return await this.menuRepository.save(menu);
  }

  findAll(): Promise<Menu[]> {
    return this.menuRepository.find({
      relations: ['restaurant'],
    });
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.menuRepository.preload({
      id,
      ...updateMenuDto,
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return this.menuRepository.save(menu);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.menuRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Menu not found');
    }
    return { message: 'Menu deleted successfully' };
  }
}
