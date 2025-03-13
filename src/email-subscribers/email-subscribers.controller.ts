// import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
// import { EmailSubscribersService } from './email-subscribers.service';
// import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
// import { UpdateEmailSubscriberDto } from './dto/update-email-subscriber.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { UserRole, PermissionAction } from 'src/enum';
// import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

// @Controller('email-subscribers')
// export class EmailSubscribersController {
//   constructor(private readonly emailSubscribersService: EmailSubscribersService) {}

//   @Post()
//   create(@Body() dto: CreateEmailSubscriberDto) {
//     return this.emailSubscribersService.create(dto);
//   }

//   @Get()
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.ADMIN)
//   // @CheckPermissions([PermissionAction.READ, 'email_subscribers'])
//   findAll(@Query() dto: CommonPaginationDto) {
//     return this.emailSubscribersService.findAll(dto);
//   }
// }
