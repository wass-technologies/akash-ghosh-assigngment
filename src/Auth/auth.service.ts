import { Injectable, UnauthorizedException,ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity'; 
import { RestaurantService } from '../restaurant/restaurant.service'; 

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private restaurantService: RestaurantService,
    
      @InjectRepository(User) private userRepository: Repository<User>,
      @InjectRepository(Restaurant) private restaurantRepository: Repository<Restaurant>, 
    ) {}
  
    async register(createUserDto: CreateUserDto) {
      const existingUser = await this.userService.findByEmail(createUserDto.email);
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // Hash password
    
      
      const user = await this.userService.create({ 
        ...createUserDto, 
        password: hashedPassword 
      });
    
      // If user is registering as a restaurant,
      if (createUserDto.role === 'restaurant') {
        await this.restaurantService.create({ 
          name: createUserDto.name, 
          email: createUserDto.email, 
          owner: user // Link the restaurant with the user
        });
      }
    
      return user;
    }
    
  

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user; // Returning user if credentials are valid
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
