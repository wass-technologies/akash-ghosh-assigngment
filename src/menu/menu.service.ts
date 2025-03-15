// import { Injectable } from '@nestjs/common';
// import { CreateMenuDto } from './dto/create-menu.dto';
// import { UpdateMenuDto } from './dto/update-menu.dto';

// @Injectable()
// export class MenuService {
//   create(createMenuDto: CreateMenuDto) {
//     return 'This action adds a new menu';
//   }

//   async addMenuItem(menuDto: CreateMenuDto) {
//     const { restaurantId, item_name, price, description,  } = menuDto;
  

    
//     const restaurant = await this.restaurantRepo.findOne({ where: { id: restaurantId } });

//     if (!restaurant) {
//         throw new NotFoundException('Restaurant not found');
//     }
//     const existingMenuItem = await this.menuRepo.findOne({
//       where: {
//         item_name, 
//         restaurant: { id: restaurantId }  
//       }
//     });
//     if (existingMenuItem) {
//       throw new BadRequestException('A menu item with this name already exists for this restaurant');
//     }

    
//     const menuItem = this.menuRepo.create({
//         item_name,
//         price,
//         description,
//         availability: AvailabilityStatus.AVAILABLE ? AvailabilityStatus.AVAILABLE : AvailabilityStatus.UNAVAILABLE,
//         restaurant,
//     });

//     return await this.menuRepo.save(menuItem);
// }
// }
