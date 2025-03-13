import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Account } from 'src/account/entities/account.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';
import { PermissionAction, UserRole } from 'src/enum';
import { FeedbackPaginationDto, RatingFeedbackDto } from './dto/rating-feedback.dto';
import { RatingFeedbackService } from './rating-feedback.service';

@Controller('rating-feedback')
export class RatingFeedbackController {
  constructor(private readonly ratingFeedbackService: RatingFeedbackService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.CUSTOMER)
  create(@Body() dto: RatingFeedbackDto, @CurrentUser() user: Account) {
    dto.accountId = user.id;
    return this.ratingFeedbackService.create(dto);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.CUSTOMER)
  find(@CurrentUser() user: Account) {
    return this.ratingFeedbackService.find(user.id);
  }

  @Get('ofvendor')
  findByUser(@Query() dto: FeedbackPaginationDto){
    return this.ratingFeedbackService.findByUser(dto)
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  async findAll(@Query() query) {
    const limit = query.limit || 10;
    const offset = query.offset || 0;
    const keyword = query.keyword || '';
    const status = query.status === 'true';
    return await this.ratingFeedbackService.findAll(
      limit,
      offset,
      keyword,
      status,
    );
  }

//   @Get('vendor')
//   @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
//   @Roles(UserRole.VENDOR)
//   async findByVendor(@Query() query, @CurrentUser() user: Account) {
//     const limit = query.limit || 10;
//     const offset = query.offset || 0;
//     const keyword = query.keyword || '';
//     const status = query.status === 'true';
//     return await this.ratingFeedbackService.findByVendor(
//       limit,
//       offset,
//       keyword,
//       status,
//       user.companyDetail[0].id,
//     );
//   }

  @Get('avarage/:companyDetailId')
  findAvaraegrating(@Param('companyDetailId') companyDetailId: string) {
    return this.ratingFeedbackService.averageRating(companyDetailId);
  }

//   @Put(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   status(@Param('id') id: string, @Body() dto: BoolStatusDto) {
//     return this.ratingFeedbackService.status(id, dto);
//   }

//   @Delete(':id')
//   @UseGuards(AuthGuard('jwt'), RolesGuard)
//   @Roles(UserRole.VENDOR)
//   remove(@Param('id') id: string) {
//     return this.ratingFeedbackService.remove(id);
//   }
}
