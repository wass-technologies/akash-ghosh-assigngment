import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { User } from './user/entities/user.entity';
import { Restaurant } from './restaurant/entities/restaurant.entity';
import { Menu } from './menu/entities/menu.entity';
import { Order } from './order/entities/order.entity';
import { Cart } from './cart/entities/cart.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
     
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    RestaurantModule,
    MenuModule,
    OrderModule,
    CartModule,
  ],
})
export class AppModule {}
