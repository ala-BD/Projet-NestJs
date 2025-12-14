import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';
import { ObjectId } from 'mongodb';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create user
  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data.email, data.password, data.role);
  }

  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // Find user by email
  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return await this.usersService.findOneByEmail(email);
  }

  // Get active users
  @Get('active')
  async findActive(): Promise<User[]> {
    return await this.usersService.findActive();
  }

  // Find user by ID
  @Get(':id')
  async findOneById(@Param('id') id: ObjectId): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  // Find users by domain
  @Get('domain/:domain')
  async findUsersByDomain(@Param('domain') domain: string): Promise<User[]> {
    return await this.usersService.findUsersByDomain(domain);
  }

  // Find recent users
  @Get('recent')
  async findRecentUsers(): Promise<User[]> {
    return await this.usersService.findRecentUsers();
  }

  // Find inactive users
  @Get('inactive')
  async findInactiveUsers(): Promise<User[]> {
    return await this.usersService.findInactiveUsers();
  }

  // Paginated users
  @Get('paginated')
  async findPaginatedUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<User[]> {
    return await this.usersService.findPaginatedUsers(page, limit);
  }

  // Sorted users
  @Get('sorted')
  async findSortedUsers(): Promise<User[]> {
    return await this.usersService.findSortedUsers();
  }

  // Users with multiple sorting
  @Get('sorted/multi')
  async findUsersWithMultipleSorting(): Promise<User[]> {
    return await this.usersService.findUsersWithMultipleSorting();
  }

  // Count users by role
  @Get('stats/role-count')
  async countUsersByRole(): Promise<any> {
    return await this.usersService.countUsersByRole();
  }

  // Average time between create and update
  @Get('stats/avg-time')
  async calculateAverageTimeBetweenCreateAndUpdate(): Promise<any> {
    return await this.usersService.calculateAverageTimeBetweenCreateAndUpdate();
  }

  // Recent users with limit
  @Get('recent/:limit')
  async findRecentUsersLimit(@Param('limit') limit: number): Promise<User[]> {
    return await this.usersService.findRecentUsersLimit(limit);
  }

  // Update user by ID
  @Put(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  // Activate user account
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