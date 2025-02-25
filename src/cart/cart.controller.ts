import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request ,Req} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from '../Auth/auth.guard';
import { RolesGuard } from '../Auth/roles.guard';
import { Roles } from '../Auth/roles.decorator';
import { UserRole } from '../constants/enums';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER) 
  @Post()
  async addItemToCart(@Body() createCartDto: CreateCartDto, @Req() req) {
    console.log("Logged-in user:", req.user); 
    const userId = req.user.id; 
    return this.cartService.addItemToCart(userId, createCartDto);
  }
}
