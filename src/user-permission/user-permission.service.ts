import { Injectable, ForbiddenException } from '@nestjs/common';
import { PermissionAction } from 'src/enums';
import

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
  ) {}

  // ✅ Assign permission (Admin Only)
  async assignPermission(adminId: number, userId: number, permission: PermissionAction): Promise<string> {
    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin || admin.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can assign permissions');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Check if the permission already exists
    const existingPermission = await this.permissionRepository.findOne({ where: { user: user, action: permission } });

    if (!existingPermission) {
      const newPermission = this.permissionRepository.create({ user, action: permission });
      await this.permissionRepository.save(newPermission);
    }

    return `Permission ${permission} assigned to user ${userId}`;
  }
}
