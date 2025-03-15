// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Patch,
//   Post,
//   Put,
//   Query,
//   UseGuards,
// } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
// import { DefaultStatus, PermissionAction, UserRole } from 'src/enum';
// import { LanguageDto, PaginationDto, StatusDto } from './dto/language.dto';
// import { LanguagesService } from './languages.service';

// @Controller('languages')
// export class LanguagesController {
//   constructor(private readonly languagesService: LanguagesService) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
//   // @CheckPermissions([PermissionAction.CREATE, 'language'])
//   create(@Body() dto: LanguageDto) {
//     return this.languagesService.create(dto);
//   }

//   @Get('all')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
//   // @CheckPermissions([PermissionAction.READ, 'language'])
//   findAll(@Query() dto: DefaultStatusPaginationDto) {
//     return this.languagesService.findAll(dto);
//   }

//   @Get()
//   find(@Query() dto: PaginationDto) {
//     return this.languagesService.find(dto);
//   }

//   @Patch(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
//   // @CheckPermissions([PermissionAction.UPDATE, 'language'])
//   update(@Param('id') id: string, @Body() dto: LanguageDto) {
//     return this.languagesService.update(id, dto);
//   }

//   @Put(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
//   // @CheckPermissions([PermissionAction.UPDATE, 'language'])
//   status(@Param('id') id: string, @Body() dto: DefaultStatus) {
//     return this.languagesService.status(id, dto);
//   }
// }
