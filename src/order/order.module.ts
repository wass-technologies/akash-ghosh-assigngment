import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Cart } from '../cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import{CartModule} from '../cart/cart.module';

import { CartService } from 'src/cart/cart.service';


@Module({
imports: [TypeOrmModule.forFeature([Order, Cart,User,Restaurant,Menu])],
controllers: [OrderController],
  providers: [OrderService,CartService],
  exports: [OrderService, TypeOrmModule],
})
export class OrderModule {}
