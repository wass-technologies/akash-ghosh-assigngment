import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../Auth/auth.guard';
import { RolesGuard } from '../Auth/roles.guard';
import { Roles } from '../Auth/roles.decorator';
import { UserRole } from '../constants/enums';
import{UseGuards} from '@nestjs/common';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.RESTAURANT)  // ✅ Ensure only restaurant owners can add menus
  @Post()
  async addMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.addMenuItem(createMenuDto);
  }

}