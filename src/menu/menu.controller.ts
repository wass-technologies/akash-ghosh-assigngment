import { Controller, Get, Post, Body, Param, Patch, Delete,Put ,Req} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../Auth/Gurd/auth.guard';
import { RolesGuard } from '../Auth/Gurd/roles.guard';
import { Roles } from '../Auth/Gurd/roles.decorator';
import { UserRole } from '../constants/enums';
import{UseGuards} from '@nestjs/common';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
// crete menu
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)  
  @Post('create')
  async addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.addMenuItem(createMenuDto);
  }

  /// all menu 
  @Get()
  async getAllMenus() {
      return this.menuService.getAllMenus();
  }

  // View menu by restaurant ID (Public)
  @Get('restaurant/:id')
  async getMenuByRestaurantByid(@Param('id') id: number) {  
      return this.menuService.getMenuByRestaurant(id);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT) 
  @Put(':id')
  async updateMenu(
    @Param('id') id: number, 
    @Body() updateMenuDto: UpdateMenuDto,
    @Req() req
  ) {
    return this.menuService.updateMenuItem(Number(id), updateMenuDto, req.user); // Convert to number manually
  }
  //Delete menu item (Only restaurant owner)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  async deleteMenu(@Param('id') id: number, @Req() req) {  
      return this.menuService.deleteMenuItem(id, req.user);
  }
 

   
}