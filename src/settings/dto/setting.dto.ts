import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DefaultStatus } from 'src/enum';

export class SettingDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsUrl()
  user_domain: string;

  @IsOptional()
  @IsUrl()
  admin_domain: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(150)
  mobile_domain :string;

  @IsOptional()
  @IsEnum(DefaultStatus)
  status: DefaultStatus;
}
