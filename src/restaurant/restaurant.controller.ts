import { Controller, Post, Get, Param, Patch, Body,Req } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Roles } from '../Auth/roles.decorator';
import { UserRole } from '../constants/enums';
import { JwtAuthGuard } from '../Auth/auth.guard';
import { RolesGuard } from '../Auth/roles.guard';
import { UseGuards, Request } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  
  @UseGuards(JwtAuthGuard)
  @Get('status/:id')
  async getRestaurantStatus(@Param('id') id: number) {
    return await this.restaurantService.getRestaurantStatus(Number(id));
  }


  

@Get('active')
getActiveRestaurants() {
  return this.restaurantService.getActiveRestaurants();
}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/activate')
  activateRestaurant(@Param('id') id: number) {
    return this.restaurantService.setRestaurantStatus(id, true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/deactivate')
  deactivateRestaurant(@Param('id') id: number) {
    return this.restaurantService.setRestaurantStatus(id, false);
  }

  @Get()
  getAllRestaurants() {
    return this.restaurantService.findAllRestaurants();
  }




 
}
