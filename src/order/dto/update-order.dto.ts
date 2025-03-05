import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../enums';

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
