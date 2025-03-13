import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateContactUsDto {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    phoneNumber: string;
    
    @IsNotEmpty()
    query: string;

    @IsOptional()
    message: string;
}
