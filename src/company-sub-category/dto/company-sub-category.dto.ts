import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CompanySubCategoryDto {
  @IsNotEmpty()
  subCategoryId: string[];

  @IsOptional()
  accountId: string;
}
