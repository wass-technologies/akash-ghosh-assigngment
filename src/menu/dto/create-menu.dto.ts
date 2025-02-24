import { IsNotEmpty, IsNumber, IsBoolean ,IsString} from 'class-validator';

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
}
