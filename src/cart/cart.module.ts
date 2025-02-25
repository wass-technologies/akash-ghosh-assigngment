import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Cart } from './entities/cart.entity';
import { User } from '../user/entities/user.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';
import{RestaurantModule} from '../restaurant/restaurant.module';


@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Menu, Restaurant]),RestaurantModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService,TypeOrmModule],
})
export class CartModule {}
