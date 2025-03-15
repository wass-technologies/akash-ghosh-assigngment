import { Type } from 'class-transformer';
import { IsNotEmpty, IsEnum, IsOptional, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { BannerType, DefaultStatus } from 'src/enum';

export class CreateBannerDto {}
export class BannerDto {
  @IsOptional()
  @IsEnum(DefaultStatus)
  status: DefaultStatus;
}

export class BannerPaginationDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(100)
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  keyword: string;

  @IsOptional()
  @IsEnum(DefaultStatus)
  status: DefaultStatus;
}