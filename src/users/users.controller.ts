import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // POST /users
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  // GET /users
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  // GET /users/email/:email  (route fixe avant :id)
  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<User> {
    return await this.usersService.findOneByEmail(email);
  }

  // GET /users/active  (route fixe avant :id)
  @Get('active')
  async findActive(): Promise<User[]> {
    return await this.usersService.findActive();
  }

  // GET /users/:id
  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  // PUT /users/:id  -> update partiel
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  // PUT /users/activate  -> activer compte
  @Put('activate')
  async activateAccount(@Body() activateUserDto: ActivateUserDto): Promise<User> {
    return await this.usersService.activateAccount(activateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.usersService.remove(id);
  }
}
