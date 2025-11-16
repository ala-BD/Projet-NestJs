import { Controller, Get, Post, Body, Param, Query, Headers, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ➤ Récupérer tous les utilisateurs (avec filtre optionnel ?status=active)
  @Get()
  findAll(@Query('status') status?: string) {
    if (status) {
      return this.usersService.findAll(status);
    }
    return this.usersService.findAll();
  }

  // ➤ Récupérer un utilisateur par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  // ➤ Nouveau : filtrage par statut avec une route dédiée
  // Exemple : GET /users/active/active  → retourne tous les users actifs
  @Get('active/:status')
  findByStatus(@Param('status') status: string) {
    return this.usersService.findAll(status);
  }

  // ➤ Créer un utilisateur
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Headers('authorization') auth: string) {
    console.log('Authorization header:', auth);
    return this.usersService.create(createUserDto);
  }

  // ➤ Mettre à jour un utilisateur
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(Number(id), updateUserDto);
  }

  // ➤ Supprimer un utilisateur
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
