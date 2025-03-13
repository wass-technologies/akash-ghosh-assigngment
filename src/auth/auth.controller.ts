import {
  Body,
  Controller,
  Get,
  Ip,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserRole } from 'src/enum';
import { AdminSigninDto,  SigninDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post('register')
  async register(@Body() registerUserDto:RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }
  signin(@Body() dto: AdminSigninDto) {
    return this.authService.signIn(dto.loginId, dto.password);
  }

  @Post('restaurant/login')
  resturantLogin(@Body() dto: SigninDto) {
    return this.authService.userLogin(dto.loginId, UserRole.RESATAURANT);
  }
  @Post('customer/login')
  customerLogin(@Body() dto: SigninDto) {
    return this.authService.userLogin(dto.loginId,UserRole.CUSTOMER);}

  @Post('staff/login')
  userLogin(@Body() dto: SigninDto) {
    return this.authService.userLogin(dto.loginId, UserRole.STAFF);
  }
  

 
}
