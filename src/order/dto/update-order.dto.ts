import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../constants/enums';

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
