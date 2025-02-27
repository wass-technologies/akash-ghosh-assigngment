import { Controller, Post, Get, Body, Param, Patch ,Req, Request} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/Auth/auth.guard';
import { RolesGuard } from 'src/RoleBased/roles.guard';
import { Roles } from 'src/RoleBased/roles.decorator';
import { CreateCartDto } from 'src/cart/dto/create-cart.dto';
import { UpdateCartDto } from 'src/cart/dto/update-cart.dto';
import{UseGuards} from '@nestjs/common';
import { UserRole } from 'src/constants/enums';
import { UpdateOrderDto } from './dto/update-order.dto';


@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CUSTOMER) 
@Post("place")
async placeOrder(@Request() req) {
  return this.orderService.placeOrder(req.user.userid);
}

}