import { Controller, Get, Post, Body, Param, Patch, Delete,Put ,Req} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../Auth/auth.guard';
import { RolesGuard } from '../RoleBased/roles.guard';
import { Roles } from '../RoleBased/roles.decorator';
import { UserRole } from '../constants/enums';
import{UseGuards} from '@nestjs/common';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)  
  @Post('create')
  async addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.addMenuItem(createMenuDto);
  }
  @Get()
  async getAllMenus() {
      return this.menuService.getAllMenus();
  }

  // View menu by restaurant ID (Public)
  @Get('restaurant/:id')
  async getMenuByRestaurantByid(@Param('id') id: number) {  
      return this.menuService.getMenuByRestaurant(id);
  }
  // this portion not work 
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT) 
  @Put(':id')
  async updateMenu(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
    @Req() req
  ) {
    return this.menuService.updateMenuItem(id, updateMenuDto, req.user);
  }

  //Delete menu item (Only restaurant owner)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)
  async deleteMenu(@Param('id') id: number, @Req() req) {  
      return this.menuService.deleteMenuItem(id, req.user);
  }
 

   
}