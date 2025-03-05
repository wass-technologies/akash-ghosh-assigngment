import { SetMetadata } from '@nestjs/common';
import { PermissionAction } from 'src/enums';
// Define metadata key
export const PERMISSION_CHECKER_KEY = 'permissions';



// Custom decorator for permissions
export const Permissions = (...permissions: PermissionAction []) =>SetMetadata(PERMISSION_CHECKER_KEY, permissions);
