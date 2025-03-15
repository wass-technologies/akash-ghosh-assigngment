import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { LeedStatus } from 'src/enum';

export class CreateLeedDto {
  @IsOptional()
  enquiryFor: string;

  @IsOptional()
  location: string;

  @IsOptional()
  accountId: string;
}

export class LeedPaginationDto {
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

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(100)
  keyword: string;

  @IsOptional()
  @IsEnum(LeedStatus)
  status: LeedStatus;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  fromDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  toDate: Date;
}

export class PdfLeadPaginationDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  fromDate: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  toDate: Date;
}
