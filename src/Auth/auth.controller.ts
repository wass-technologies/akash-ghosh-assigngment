import { Controller, Post, Body, Get,UnauthorizedException ,Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../Auth/dto/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {  
    const user = await this.authService.validateUser(loginDto); 
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return this.authService.login(user);
  }
  

  
  }

