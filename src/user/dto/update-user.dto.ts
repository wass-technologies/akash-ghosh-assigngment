// src/user/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto'; // ensure you have a CreateUserDto

export class UpdateUserDto extends PartialType(CreateUserDto) {}
