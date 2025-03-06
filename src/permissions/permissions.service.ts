import { Injectable, } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionAction } from 'src/enums';


@Injectable()
export class PermissionsService {
  private readonly logger = new Logger(PermissionsService.name);
  constructor(
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
  
  ) {}

  
  async onModuleInit() {
    try {
      const existingPermissions = await this.permissionRepository.find();
      const existingActions = new Set(existingPermissions.map((perm) => perm.action));
      const enumActions = new Set(Object.values(PermissionAction));
  
      const newPermissions = Object.values(PermissionAction)
        .filter((action) => !existingActions.has(action))
        .map((action) => ({ action }));
  
      const obsoletePermissions = existingPermissions
        .filter((perm) => !enumActions.has(perm.action))
        .map((perm) => perm.id);
  
      if (newPermissions.length > 0) {
        await this.permissionRepository.insert(newPermissions);
        this.logger.log('New permissions added.');
      }
  
      if (obsoletePermissions.length > 0) {
        await this.permissionRepository.delete(obsoletePermissions);
        this.logger.log('Obsolete permissions removed.');
      }
    } catch (error) {
      this.logger.error('Error initializing permissions:', error);
    }
  }
  
 
  
  
}

  

