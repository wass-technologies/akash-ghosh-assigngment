import { Controller, Post, Param,Req,Body } from '@nestjs/common';

import { UserPermissionsService } from './user-permission.service';
import { PermissionsGuard } from 'src/Auth/Gurd/permissions.guard';
import { Permissions} from 'src/Auth/decorators/permissions.decorator';
import { PermissionAction } from 'src/enums';
import { UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/Auth/Gurd/auth.guard';
import { RolesGuard } from 'src/Auth/Gurd/roles.guard';;

import { Roles } from '../Auth/decorators/roles.decorator';
import { UserRole } from 'src/enums';

@Controller('user-permissions')
export class UserPermissionsController {
  constructor(private readonly userPermissionsService: UserPermissionsService) {}
  @Post('assign')
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles(UserRole.ADMIN)
  async assignPermission(
    @Req() req,@Body() { userId, permission }: { userId: number; permission: PermissionAction },
  ) {
    const adminId = req.user.userId; 
    return this.userPermissionsService.assignPermission(adminId, userId, permission);
  }
}
