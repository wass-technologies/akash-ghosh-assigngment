import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCompanyKeywordDto {
    @IsNotEmpty()
    @IsString()
    keyword: string;

    @IsOptional()
    accountId: string;
}
