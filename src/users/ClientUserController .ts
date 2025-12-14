import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { IntercepteurFiltre } from '../intercepteurs/intercepteur.interceptor';
import { UsersService } from './users.service';

@UseInterceptors(IntercepteurFiltre)
@Controller('client/users')
export class ClientUserController {
  constructor(private userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}