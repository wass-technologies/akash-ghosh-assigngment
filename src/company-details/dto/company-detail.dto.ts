import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
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
import {  CompanyStatus } from 'src/enum';

export class CompanyDetailDto {
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  businessName: string;

  @IsOptional()
  @IsEmail()
  @MinLength(0)
  @MaxLength(50)
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  state: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  city: string;
  
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  area: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(200)
  address1: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(200)
  address2: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(50)
  pincode: string;

  // @IsOptional()
  // @IsString()
  // @MinLength(0)
  // @MaxLength(500)
  // businessDesc: string;

  // @IsOptional()
  // @IsString()
  // @MinLength(0)
  // @MaxLength(150)
  // minPrice: string;
  
  // @IsOptional()
  // @IsString()
  // @MinLength(0)
  // @MaxLength(150)
  // maxPrice: string;
  
  // @IsOptional()
  // @IsString()
  // @MinLength(0)
  // @MaxLength(150)
  // fbLink: string;

  // @IsOptional()
  // @IsString()
  // @MinLength(0)
  // @MaxLength(150)
  // wpLink: string;

  // @IsOptional()
  // @IsString()
  // @MinLength(0)
  // @MaxLength(150)
  // instaLink: string;

  // @IsOptional()
  // @IsString()
  // @MinLength(0)
  // @MaxLength(150)
  // callNumber: string;
}

export class StatusDto {
  @IsNotEmpty()
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
}

export class PaginationSDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(50)
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  keyword: string;

  @IsNotEmpty()
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
}

export class PaginationDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(50)
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  keyword: string;

  @IsOptional()
  @IsArray()
  category: any; // [1,2,3,4,5]

  @IsOptional()
  @IsArray()
  subCategory: any; // [1,2,3,4,5]
}
