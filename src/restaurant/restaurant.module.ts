import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { User } from 'src/user/entities/user.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, User])],
  controllers: [RestaurantController],
  providers: [RestaurantService],
  exports: [RestaurantService,TypeOrmModule],
})
export class RestaurantModule {}
