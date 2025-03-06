import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { PermissionAction } from 'src/enums';
import { UserPermission } from 'src/user-permission/entities/user-permission.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;
 

  @Column({ type: 'enum', enum: PermissionAction }) // Removed `unique: true`
  action: PermissionAction;

  @OneToMany(() => UserPermission, (userPermission) => userPermission.permission, {
    cascade: true, // Ensures permission deletions affect related user permissions
  })
  userPermissions: UserPermission[];
}