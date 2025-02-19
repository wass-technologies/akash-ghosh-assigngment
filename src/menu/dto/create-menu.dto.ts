import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;

  @IsBoolean()
  isAvailable: boolean;

  @IsNumber()
  restaurantId: number;
}
