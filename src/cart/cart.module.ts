import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { User } from '../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Menu])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
