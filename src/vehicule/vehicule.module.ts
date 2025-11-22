import { Module } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';
import { VehiculeController } from './vehicule.controller';
import { VehiculeRepository } from './vehicule.repository';
import { MoteurModule } from 'src/moteur/moteur.module';
import { GenerateurModule } from 'src/generateur/generateur.module';
import { PhareModule } from 'src/phare/phare.module';
import { AudioModule } from 'src/audio/audio.module';

@Module({
  imports: [MoteurModule, GenerateurModule, PhareModule, AudioModule],
  controllers: [VehiculeController],
  providers: [VehiculeService, VehiculeRepository],
})
export class VehiculeModule {}
