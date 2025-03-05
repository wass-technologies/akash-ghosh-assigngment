import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPermissionsService } from 'src/user-permission/user-permission.service';
import { UserPermissionsController } from 'src/user-permission/user-permission.controller';
import { UserPermission } from 'src/user-permission/entities/user-permission.entity';
import { User } from 'src/user/entities/user.entity';
import {PermissionsModule} from 'src/permissions/permissions.module'; // Import PermissionsModule
import { Permission } from 'src/permissions/entities/permission.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserPermission, User,Permission]),
    PermissionsModule, // Use Permission Service
  ],
  controllers: [UserPermissionsController],
  providers: [UserPermissionsService],
})
export class UserPermissionsModule {}
