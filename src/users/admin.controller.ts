import { Controller, Get, Query, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IntercepteurFiltre } from "../intercepteurs/intercepteur.interceptor";

@UseInterceptors(IntercepteurFiltre)
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: string) {
    if (role) {
      return this.usersService.findUsersByRole(role);
    }
    return this.usersService.findAll();
  }
}