import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
    { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
    { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
    { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
  ];

  findAll(status?: string) {
    if (status) return this.users.filter(u => u.status === status);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newUser = { id: this.users.length + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: CreateUserDto) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`User with ID ${id} not found`);
    this.users[index] = { ...this.users[index], ...updateUserDto };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`User with ID ${id} not found`);
    return this.users.splice(index, 1);
  }
}
