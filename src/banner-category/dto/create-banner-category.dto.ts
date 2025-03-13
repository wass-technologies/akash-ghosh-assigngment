import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { DefaultStatus } from 'src/enum';

export class CreateBannerCategoryDto {
  @IsNotEmpty()
  bannerId: string;

  @IsNotEmpty()
  categoryId: [];
}

export class BannerCategoryPaginationDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(5)
  @Max(100)
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset: number;

  // @IsOptional()
  // status: DefaultStatus;

  @IsOptional()
  bannerId: string;
}
