import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity('user_permissions')
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userPermissions, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Permission, { onDelete: 'CASCADE' })
  permission: Permission;
}




