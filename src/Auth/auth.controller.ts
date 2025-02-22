import { Controller, Post, Body, Get,UnauthorizedException ,Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Req() req) {
    return req.user; // Returns user details extracted from JWT token
  }
  }

