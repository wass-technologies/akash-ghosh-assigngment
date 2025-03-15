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
//import { AdminSigninDto,  SigninDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  // signin(@Body() dto: AdminSigninDto) {
  //   return this.authService.signIn(dto.loginId, dto.password);
  // }

  // @Post('restaurant/login')
  // resturantLogin(@Body() dto: SigninDto) {
  //   return this.authService.userLogin(dto.loginId, UserRole.RESTAURANT);
  // }
  // @Post('customer/login')
  // customerLogin(@Body() dto: SigninDto) {
  //   return this.authService.userLogin(dto.loginId,UserRole.CUSTOMER);}

  // @Post('staff/login')
  // userLogin(@Body() dto: SigninDto) {
  //   return this.authService.userLogin(dto.loginId, UserRole.STAFF);
  // }
  

 
}