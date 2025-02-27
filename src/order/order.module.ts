import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Cart } from '../cart/entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { UserModule } from '../user/user.module';
import{CartModule} from '../cart/cart.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { MenuModule } from 'src/menu/menu.module';
import { CartService } from 'src/cart/cart.service';


@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart,User,Restaurant,Menu]),UserModule,CartModule,RestaurantModule,MenuModule],
  
controllers: [OrderController],
  providers: [OrderService,CartService],
  exports: [OrderService, TypeOrmModule],
})
export class OrderModule {}
