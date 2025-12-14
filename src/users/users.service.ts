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
import { UpdateUserDto } from './dto/update-user.dto';
import { ActivateUserDto } from './dto/activate-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  // Créer un nouvel utilisateur
  async createUser(email: string, password: string, role: string): Promise<User> {
    try {
      const now = new Date();
      const user = this.userRepository.create({
        email,
        password,
        role,
        active: true,
        createdAt: now,
        updatedAt: now,
      } as Partial<User>);
      
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Erreur lors de la création de l'utilisateur");
    }
  }

  // Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Trouver un utilisateur par ID
  async findOneById(id: ObjectId): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) } as any,
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec ID ${id} non trouvé`);
    }

    return user;
  }

  // Trouver un utilisateur par email
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec email ${email} non trouvé`);
    }

    return user;
  }

  // Lister les utilisateurs actifs
  async findActive(): Promise<User[]> {
    return await this.userRepository.find({ where: { active: true } });
  }

  // Mettre à jour un utilisateur par ID
  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(id);
    Object.assign(user, updateUserDto);
    user.updatedAt = new Date();
    
    return await this.userRepository.save(user);
  }

  // Supprimer un utilisateur par ID
  async remove(id: ObjectId): Promise<void> {
    const user = await this.findOneById(id);
    await this.userRepository.remove(user);
  }

  // Activer le compte utilisateur (vérification de mot de passe)
  async activateAccount(dto: ActivateUserDto): Promise<User> {
    const user = await this.findOneByEmail(dto.email);

    if (user.password !== dto.password) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    user.active = true;
    user.updatedAt = new Date();
    return await this.userRepository.save(user);
  }

  // PARTIE 1: Récupérer les données

  // Filtrer les utilisateurs par rôle
  async findUsersByRole(role: string): Promise<User[]> {
    return await this.userRepository.find({ where: { role } });
  }

  // Trouver les utilisateurs inactifs (non mis à jour depuis 6 mois)
  async findInactiveUsers(): Promise<User[]> {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    return await this.userRepository.find({
      where: { updatedAt: { $lt: sixMonthsAgo } } as any,
    });
  }

  // Trouver les utilisateurs par domaine d'email
  async findUsersByDomain(domain: string): Promise<User[]> {
    return await this.userRepository.find({
      where: { email: { $regex: `@${domain}$` } } as any,
    });
  }

  // Trouver les utilisateurs récents (créés dans les 7 derniers jours)
  async findRecentUsers(): Promise<User[]> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return await this.userRepository.find({
      where: { createdAt: { $gte: sevenDaysAgo } } as any,
    });
  }

  // PARTIE 2: Requêtes basées sur les statistiques

  // Compter les utilisateurs groupés par rôle
  async countUsersByRole(): Promise<any[]> {
    return await this.userRepository.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } }
    ]).toArray();
  }

  // Trouver les utilisateurs créés entre deux dates
  async findUsersByDateRange(startDate: Date, endDate: Date): Promise<User[]> {
    return await this.userRepository.find({
      where: { createdAt: { $gte: startDate, $lte: endDate } } as any,
    });
  }

  // Trouver les utilisateurs récents avec limite
  async findRecentUsersLimit(limit: number): Promise<User[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  // Calculer le temps moyen entre création et mise à jour
  async calculateAverageTimeBetweenCreateAndUpdate(): Promise<any> {
    const result = await this.userRepository.aggregate([
      {
        $project: {
          timeDiffInDays: {
            $divide: [
              { $subtract: ['$updatedAt', '$createdAt'] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
      { $group: { _id: null, averageDays: { $avg: '$timeDiffInDays' } } },
    ]).toArray();
    
    return result[0]?.['averageDays'] || 0;
  }

  // PARTIE 3: Pagination et Tri

  // Trouver les utilisateurs avec pagination
  async findPaginatedUsers(page: number, limit: number): Promise<User[]> {
    return await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // Trouver les utilisateurs triés par date de création (décroissant)
  async findSortedUsers(): Promise<User[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // Trouver les utilisateurs avec plusieurs critères de tri
  async findUsersWithMultipleSorting(): Promise<User[]> {
    return await this.userRepository.find({
      order: { role: 'ASC', createdAt: 'DESC' },
    });
  }
}