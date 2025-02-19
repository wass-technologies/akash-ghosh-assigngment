import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { OrderStatus } from '../../constants/enums';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsNumber()
  totalPrice: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
