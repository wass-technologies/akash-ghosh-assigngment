import { Controller, Post, Get, Param, Patch, Body } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  getAllRestaurants() {
    return this.restaurantService.findAllRestaurants();
  }

  @Patch(':id/activate')
  activateRestaurant(@Param('id') id: number) {
    return this.restaurantService.activate(id);
  }

  @Patch(':id/deactivate')
  deactivateRestaurant(@Param('id') id: number) {
    return this.restaurantService.deactivate(id);
  }
}
