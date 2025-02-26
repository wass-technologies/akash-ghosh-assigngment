import { IsNotEmpty, IsNumber, IsBoolean ,IsString,IsEnum,IsOptional} from 'class-validator';
import { AvailabilityStatus } from '../../constants/enums';

export class CreateMenuDto {
  @IsNotEmpty()
  item_name: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsString()
  description: string;

  @IsNumber()
  restaurantId: number;

  @IsEnum(AvailabilityStatus)
  @IsOptional()
  availability?: AvailabilityStatus;
}
