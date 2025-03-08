import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { AuthModule } from "./Auth/auth.module";
import { PermissionsModule } from './permissions/permissions.module';
import { UserPermissionsModule} from './user-permission/user-permission.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities:[__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:false,
    }),
    UserModule,
    RestaurantModule,
    MenuModule,
    OrderModule,
    CartModule,
    AuthModule,
    PermissionsModule,
    UserPermissionsModule,
   
  ],
})
export class AppModule {}
