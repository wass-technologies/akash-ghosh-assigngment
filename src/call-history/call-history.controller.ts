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
// import { CallHistoryService } from './call-history.service';
// import {
//   CallHistoryPaginationDto,
//   CreateCallHistoryDto,
// } from './dto/create-call-history.dto';
// import { UpdateCallHistoryDto } from './dto/update-call-history.dto';
// import { Auth } from 'src/auth/entities/auth.entity';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { UserRole } from 'src/enum';
// import { Account } from 'src/account/entities/account.entity';
// import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

// @Controller('call-history')
// export class CallHistoryController {
//   constructor(private readonly callHistoryService: CallHistoryService) {}

//   @Get('vendor')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   findAll(
//     @Query() dto: CallHistoryPaginationDto,
//     @CurrentUser() user: Account,
//   ) {
//     return this.callHistoryService.findAll(dto, user.companyDetail[0].id);
//   }

//   @Get('user')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.USER)
//   findByUser(
//     @Query() dto: CallHistoryPaginationDto,
//     @CurrentUser() user: Account,
//   ) {
//     return this.callHistoryService.findByUser(dto, user.id);
//   }

//   @Get('admin/:companyDetailId')
//   findByAdmin(
//     @Query() dto: CallHistoryPaginationDto,
//     @Param('companyDetailId') companyDetailId: string,
//   ) {
//     return this.callHistoryService.findByAdmin(dto, companyDetailId);
//   }
// }
