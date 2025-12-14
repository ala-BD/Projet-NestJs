import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { AdminController } from './admin.controller';
import { ClientUserController } from './ClientUserController ';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, AdminController, ClientUserController],
  providers: [UsersService],
})
export class UsersModule {}