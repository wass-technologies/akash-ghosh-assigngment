import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { UserPermissionsService } from 'src/user-permission/user-permission.service';
import { PermissionAction } from 'src/enums';
import{PERMISSION_CHECKER_KEY}from 'src/Auth/decorators/permissions.decorator';
import { Reflector } from '@nestjs/core';


@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    
    private reflector: Reflector,
    private userPermissionService: UserPermissionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<PermissionAction[]>(
      PERMISSION_CHECKER_KEY,
      context.getHandler()
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true; // No specific permissions required, allow access
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Fetch user permissions from the database
    const userPermissions = await this.userPermissionService.getUserPermissions(user.id);

    // Check if the user has all required permissions
    const hasPermission = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenException('Access Denied');
    }

    return true;
  }
}