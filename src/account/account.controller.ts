import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CheckPermissions } from 'src/auth/decorators/permissions.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PermissionAction, UserRole } from 'src/enum';
import { MenusService } from 'src/menus/menus.service';
import { PermissionsService } from 'src/permissions/permissions.service';
import { UserPermissionsService } from 'src/user-permissions/user-permissions.service';
import { AccountService } from './account.service';
import { BusinessPaginationDto, PaginationDto, StatusDto } from './dto/account.dto';
import { Account } from './entities/account.entity';
import { SearchHistoryService } from 'src/search-history/search-history.service';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly searchHistoryService: SearchHistoryService,
    private readonly menuService: MenusService,
    private readonly permissionService: PermissionsService,
    private readonly userPermService: UserPermissionsService,
  ) { }

  @Get('vendor/profile')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.RESATAURANT)
  profile(@CurrentUser() user: Account){
    return this.accountService.profile(user.id);
  }
  
  @Get('resataurantDetails/:accountId')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @CheckPermissions([PermissionAction.READ, 'account'])
  vendorDetailByAdmin(@Param('accountId') accountId: string){
    return this.accountService.detail(accountId);
  }

  @Get('vendorDetail/user/:accountId')
  vendorDetailByUser(@Param('accountId') accountId: string){
    return this.accountService.detailByUser(accountId);
  }

  @Get('vendors')
  @UseGuards(AuthGuard('jwt'), RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  @CheckPermissions([PermissionAction.READ, 'account'])
  findAll(@Query() query: PaginationDto) {
    return this.accountService.findAll(query);
  }
  
  @Get('resataurant/list')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.CUSTOMER)
  findAllByUser(@Query() dto: BusinessPaginationDto, @CurrentUser() user: Account) {
    if (dto.keyword && dto.keyword.length > 0) {
      this.searchHistoryService.create({
        keyword: dto.keyword,
        accountId: user.id
      });
    }
    return this.accountService.findAllByUser(dto);
  }

  @Get('user/profile')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.CUSTOMER)
  userProfile(@CurrentUser() user: Account){
    return this.accountService.userProfile(user.id);
  }
}
