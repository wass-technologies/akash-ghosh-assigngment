import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';


@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  // ✅ Create a new permission (Admin only)
  async createPermission(name: string): Promise<Permission> {
    const permission = this.permissionRepository.create({ name });
    return this.permissionRepository.save(permission);
  }

  // ✅ Get all permissions
  async getPermissions(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

 
  
  
}

  

