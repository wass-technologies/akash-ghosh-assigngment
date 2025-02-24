import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RestaurantStatus } from '../../constants/enums';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;


  @IsEnum(RestaurantStatus)
  status: RestaurantStatus;
}
