import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
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

  //Create new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        active: false,
      } as Partial<User>);

      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException(
        "Erreur lors de la création de l'utilisateur",
      );
    }
  }

  //Get all users
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  //Find user by ID
  async findOneById(id: ObjectId): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) } as any,
    });

    if (!user) throw new NotFoundException(`Utilisateur avec ID ${id} non trouvé`);

    return user;
  }

  //Find user by email
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user)
      throw new NotFoundException(`Utilisateur avec email ${email} non trouvé`);

    return user;
  }

  //List active users
  async findActive(): Promise<User[]> {
    return await this.userRepository.find({ where: { active: true } });
  }

  //Update user by ID
  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  //Delete user by ID
  async remove(id: ObjectId): Promise<void> {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);
  }

  //Activate user account (Verification de mot de passe)
  async activateAccount(dto: ActivateUserDto): Promise<User> {
    const user = await this.findOneByEmail(dto.email);

    if (user.password !== dto.password) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    user.active = true;
    return await this.userRepository.save(user);
  }
}
