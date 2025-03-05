import { Controller, Post, Get, Body } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('create')
  async createPermission(@Body('name') name: string) {
    return this.permissionsService.createPermission(name);
  }

  
  @Get()
  async getPermissions() {
    return this.permissionsService.getPermissions();
  }
}
