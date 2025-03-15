import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CompanyCategoryDto {
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsOptional()
  accountId: string;
}
