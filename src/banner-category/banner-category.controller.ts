// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Query,
// } from '@nestjs/common';
// import { BannerCategoryService } from './banner-category.service';
// import { BannerCategoryPaginationDto, CreateBannerCategoryDto } from './dto/create-banner-category.dto';
// import { UpdateBannerCategoryDto } from './dto/update-banner-category.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { UserRole } from 'src/enum';

// @Controller('banner-category')
// export class BannerCategoryController {
//   constructor(private readonly bannerCategoryService: BannerCategoryService) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.ADMIN)
//   create(@Body() dto: CreateBannerCategoryDto) {
//     return this.bannerCategoryService.create(dto);
//   }

//   @Get('admin')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.ADMIN)
//   findAll(@Query() dto: BannerCategoryPaginationDto) {
//     return this.bannerCategoryService.findAll(dto);
//   }

//   @Get()
//   findByUser(@Query() dto: BannerCategoryPaginationDto) {
//     return this.bannerCategoryService.findByUser(dto);
//   }

//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.ADMIN)
//   remove(@Param('id') id: string) {
//     return this.bannerCategoryService.remove(id);
//   }
// }
