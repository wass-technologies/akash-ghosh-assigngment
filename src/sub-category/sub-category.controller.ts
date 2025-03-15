// import {
//   Body,
//   Controller,
//   FileTypeValidator,
//   Get,
//   MaxFileSizeValidator,
//   Param,
//   ParseFilePipe,
//   Patch,
//   Post,
//   Put,
//   Query,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ApiOperation } from '@nestjs/swagger';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { Account } from 'src/account/entities/account.entity';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
// import { DefaultStatusDto } from 'src/common/dto/default-status.dto';
// import { PermissionAction, UserRole } from 'src/enum';
// import { SubcatPagination } from './dto/sub-category-pagination';
// import { PaginationPDto, SubCategoryDto, UpdateSubCategoryDto } from './dto/sub-category.dto';
// import { SubCategoryService } from './sub-category.service';
// import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';

// @Controller('sub-category')
// export class SubCategoryController {
//   constructor(private readonly subCategoryService: SubCategoryService) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN)
//   @CheckPermissions([PermissionAction.CREATE, 'sub_category'])
//   create(@Body() dto: SubCategoryDto, @CurrentUser() user: Account) {
//     dto.accountId = user.id;
//     dto.updatedId = user.id;
//     return this.subCategoryService.create(dto);
//   }

//   @Get('list/all')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.ADMIN, UserRole.VENDOR)
//   findAll(@Query() query: SubcatPagination) {
//     return this.subCategoryService.findAll(query);
//   }
  
//   @Get('list/vendor')
//   findByVendor(@Query() query: SubcatPagination) {
//     return this.subCategoryService.findByVendor(query);
//   }

//   @Get('user')
//   findAllSubCat(@Query() dto: SubcatPagination) {
//     return this.subCategoryService.findAllSubCat(dto);
//   }

//   @Patch(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN)
//   @CheckPermissions([PermissionAction.UPDATE, 'sub_category'])
//   update(
//     @Param('id') id: string,
//     @Body() dto: UpdateSubCategoryDto,
//     @CurrentUser() user: Account,
//   ) {
//     dto.updatedId = user.id;
//     return this.subCategoryService.update(id, dto);
//   }

//   @Put('status/:id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN)
//   status(@Param('id') id: string, @Body() dto: DefaultStatusDto) {
//     return this.subCategoryService.status(id, dto);
//   }

//   @Put('image/:id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.ADMIN)
//   @UseInterceptors(
//     FileInterceptor('file', {
//       storage: diskStorage({
//         destination: './uploads/subCategory',
//         filename: (req, file, callback) => {
//           const randomName = Array(32)
//             .fill(null)
//             .map(() => Math.round(Math.random() * 16).toString(16))
//             .join('');
//           return callback(null, `${randomName}${extname(file.originalname)}`);
//         },
//       }),
//     }),
//   )
//   async image(
//     @Param('id') id: string,
//     @UploadedFile(
//       new ParseFilePipe({
//         validators: [
//           new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
//           new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
//         ],
//       }),
//     )
//     file: Express.Multer.File,
//   ) {
//     const fileData = await this.subCategoryService.findOne(id);
//     return this.subCategoryService.image(file.path, fileData);
//   }
// }
