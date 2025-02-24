import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { User } from 'src/user/entities/user.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from 'src/restaurant/restaurant.module';


@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure environment variables are loaded
    UserModule,
    RestaurantModule,
    PassportModule,
   
    TypeOrmModule.forFeature([User, Restaurant]),
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Get JWT secret
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UserService, RestaurantService],
  exports: [AuthService],
})
export class AuthModule {}
