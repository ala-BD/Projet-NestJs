import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ObjectId } from 'mongodb';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Create user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  //Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  //Find user by email
  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return await this.usersService.findOneByEmail(email);
  }

  //Get active users
  @Get('active')
  async findActive(): Promise<User[]> {
    return await this.usersService.findActive();
  }

  //Find user by ID
  @Get(':id')
  async findOneById(@Param('id') id: ObjectId): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  //Update user by ID
  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  //Activate user account
  @Put('activate')
  async activateAccount(@Body() activateUserDto: ActivateUserDto): Promise<User> {
    return await this.usersService.activateAccount(activateUserDto);
  }

  // Delete user by ID
  @Delete(':id')
  async remove(@Param('id') id: ObjectId): Promise<void> {
    return await this.usersService.remove(id);
  }
}
