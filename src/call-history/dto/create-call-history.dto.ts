import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Min, Max, IsOptional, IsString, MinLength, MaxLength, IsDate } from "class-validator";
import { UserRole } from "src/enum";

export class CreateCallHistoryDto {}

export class CallHistoryPaginationDto {
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
  
    // @IsOptional()
    // @IsEnum(UserRole)
    // status: UserRole;
  
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    fromDate: Date;
  
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    toDate: Date;
  }