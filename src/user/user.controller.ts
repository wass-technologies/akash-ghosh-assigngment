import { Controller, Get, Post, Patch, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Public: Create a new user (Registration)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return newUser;
    } catch (error) {
      return { message: 'Error creating user', error };
    }
  }

  // Protected: Get all users (Requires authentication)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      return { message: 'Error fetching users', error };
    }
  }

  // Protected: Get the current logged-in user's profile
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user; // JWT payload will be available in req.user
  }

  // Protected: Get a single user by ID
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(+id);
      if (!user) {
        return { message: 'User not found' };
      }
      return user;
    } catch (error) {
      return { message: 'Error fetching user', error };
    }
  }

  // Protected: Update a user
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(Number(id), updateUserDto);
  }

  // Protected: Delete a user
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return await this.userService.remove(id);
  }
}
