import { Controller, Get, Post,Patch, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.create(createUserDto);
      return newUser; // Return created user or status message
    } catch (error) {
      return { message: 'Error creating user', error };
    }
  }

  // Get all users
  @Get()
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      return { message: 'Error fetching users', error };
    }
  }

  // Get a single user by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.userService.findOne(+id); // Convert string id to number
      if (!user) {
        return { message: 'User not found' };
      }
      return user;
    } catch (error) {
      return { message: 'Error fetching user', error };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(Number(id), updateUserDto);
  }
  // Delete a user by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    return await this.userService.remove(id);
  }
  
}
