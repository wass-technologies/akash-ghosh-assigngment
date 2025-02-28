import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request ,Req,Patch,UnauthorizedException} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from '../Auth/auth.guard';
import { RolesGuard } from '../RoleBased/roles.guard';
import { Roles } from '../RoleBased/roles.decorator';
import { UserRole } from '../constants/enums';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER) 
  @Post()
  async addItemToCart(@Body() createCartDto: CreateCartDto, @Req() req) {
  
    const userId = req.user.userId;
    console.log(userId)
    return this.cartService.addItemToCart(userId, createCartDto);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.CUSTOMER)
@Get()
async getCartItems(@Req() req) {
  console.log("Decoded JWT User:", req.user); 
  const userId = req.user.userId; 
  if (!userId) {
    throw new UnauthorizedException('User ID not found in token');
  }
  return this.cartService.getCartItems(userId);
}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @Patch(':id')
  async updateCartItem(
    @Param('id') id: number,
    @Body() updateCartDto: UpdateCartDto,
    @Req() req,
  ) {
    const userId = req.user.userid; 
    return this.cartService.updateCartItem(userId, id, updateCartDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  @Delete(':id')
  async removeCartItem(@Param('id') id: number, @Req() req) {
    const userId = req.user.userid; 
    return this.cartService.removeCartItem(userId, id);
  }
}
