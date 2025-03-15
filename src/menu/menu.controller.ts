// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { MenuService } from './menu.service';
// import { CreateMenuDto } from './dto/create-menu.dto';
// import { UpdateMenuDto } from './dto/update-menu.dto';

// @Controller('menu')
// export class MenuController {
//   constructor(private readonly menuService: MenuService) {}

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(UserRole.RESTAURANT)  
//   @Post('create')
//   async addMenu(@Body() createMenuDto: CreateMenuDto) {
//     return this.menuService.addMenuItem(createMenuDto);
//   }
// }
