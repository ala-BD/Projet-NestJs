import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  // CREATE
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        active: false,
      } as Partial<User>);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException("Erreur lors de la création de l'utilisateur");
    }
  }

  // FIND ALL
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // FIND BY ID (utilise _id)
  async findOneById(id: string): Promise<User> {
    try {
      const _id = new ObjectId(id);
      // TypeORM MongoRepository mappe ObjectIdColumn sur _id
      const user = await this.userRepository.findOne({ where: { _id } as any });
      if (!user) throw new NotFoundException(`Utilisateur avec ID ${id} non trouvé`);
      return user;
    } catch (err) {
      // id invalide ou not found
      throw new NotFoundException(`Utilisateur avec ID ${id} non trouvé`);
    }
  }

  // FIND BY EMAIL
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException(`Utilisateur avec email ${email} non trouvé`);
    return user;
  }

  // FIND ACTIVE
  async findActive(): Promise<User[]> {
    return await this.userRepository.find({ where: { active: true } });
  }

  // UPDATE PARTIEL
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  // REMOVE
  async remove(id: string): Promise<void> {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);
  }

  // ACTIVATE (vérifie mot de passe)
  async activateAccount(dto: ActivateUserDto): Promise<User> {
    const user = await this.findOneByEmail(dto.email);
    if (user.password !== dto.password) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
    user.active = true;
    return await this.userRepository.save(user);
  }
}
