import { Injectable, ForbiddenException,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionAction } from 'src/enums';
import { User } from 'src/user/entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { UserPermission } from './entities/user-permission.entity';


@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(User) private userRepository:Repository<User>,
    @InjectRepository(Permission) private permissionRepository:Repository<Permission>,
    @InjectRepository(UserPermission) private userPermissionRepository:Repository<UserPermission>,
  ) {}

  async getUserPermissions(userId: number): Promise<PermissionAction[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['userPermissions', 'userPermissions.permission'],
    });
  
    if (!user) throw new NotFoundException('User not found');
  
    return user.userPermissions.map((userPermission) => userPermission.permission.action);
  }
  
  // Assign permission (Admin Only)
  async assignPermission(adminId: number, userId: number, permissionAction: PermissionAction): Promise<string> {
    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can assign permissions');
    }
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
  
    const permission = await this.permissionRepository.findOne({ where: { action: permissionAction } });
    if (!permission) throw new NotFoundException(`Permission '${permissionAction}' not found`);
  
    const existingUserPermission = await this.userPermissionRepository.findOne({ where: { user, permission } });
  
    if (!existingUserPermission) {
      const newUserPermission = this.userPermissionRepository.create({ user, permission });
      await this.userPermissionRepository.save(newUserPermission);
    }
  
    return `Permission '${permissionAction}' assigned to user ${userId}`;
  }
  
}
