import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  @IsNotEmpty()
  menuItemId: number; 

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  quantity: number; 

  @IsInt()
  @IsNotEmpty()
  restaurantId: number; 
  @IsInt()
  @IsNotEmpty()
  totalPrice: number;
  
}

  