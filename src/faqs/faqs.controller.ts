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
// import { Account } from 'src/account/entities/account.entity';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
// import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
// import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
// import { DefaultStatusDto } from 'src/common/dto/default-status.dto';
// import { PermissionAction, UserRole } from 'src/enum';
// import { FaqDto } from './dto/faq.dto';
// import { FaqsService } from './faqs.service';

// @Controller('faqs')
// export class FaqsController {
//   constructor(private readonly faqsService: FaqsService) {}

//   @Post()
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   create(@Body() dto: FaqDto, @CurrentUser() user: Account) {
//     dto.accountId = user.id;
//     return this.faqsService.create(dto);
//   }

//   @Get('all')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN)
//   @CheckPermissions([PermissionAction.READ, 'faq'])
//   findAll(@Query() dto: DefaultStatusPaginationDto) {
//     return this.faqsService.findAll(dto);
//   }

//   @Get()
//   find(@Query() dto: CommonPaginationDto) {
//     return this.faqsService.find(dto);
//   }

//   @Patch(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
//   @CheckPermissions([PermissionAction.UPDATE, 'faq'])
//   update(@Param('id') id: string, @Body() dto: FaqDto) {
//     return this.faqsService.update(id, dto);
//   }

//   @Put(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN, UserRole.EMPLOYEE)
//   @CheckPermissions([PermissionAction.UPDATE, 'faq'])
//   status(@Param('id') id: string, @Body() dto: DefaultStatusDto) {
//     return this.faqsService.status(id, dto);
//   }
// }
