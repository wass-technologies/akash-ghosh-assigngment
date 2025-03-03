import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ){
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined. Set it in your environment variables.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
  
    return { userId: user.id, email: user.email, role: user.role }
  }
  
  
}
