import { Controller, Post, Get, Param, Patch, Body,Req } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { Roles } from '../Auth/decorators/roles.decorator';
import { Permissions } from 'src/Auth/decorators/permissions.decorator';
import { UserRole ,PermissionAction} from '../enums';
import { JwtAuthGuard } from '../Auth/Gurd/auth.guard';
import { RolesGuard } from '../Auth/Gurd/roles.guard';
import { PermissionsGuard } from 'src/Auth/Gurd/permissions.guard';
import { UseGuards, Request } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { permission } from 'process';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  
  @UseGuards(JwtAuthGuard)
  @Get('status/:id')
  async getRestaurantStatus(@Param('id') id: number) {
    return await this.restaurantService.getRestaurantStatus(Number(id));
  }
// check active resturant 

@Get('active')
getActiveRestaurants() {
  return this.restaurantService.getActiveRestaurants();
}
// check menu by admin 

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN) 
@Get(':restaurantId/menu')
async getMenuByRestaurantForAdmin(@Param('restaurantId') restaurantId: number) {
  return this.restaurantService.getMenuByRestaurantForAdmin(restaurantId);
}

// actvate by admin

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
