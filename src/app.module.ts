import { Module } from '@nestjs/common';
import { MoteurModule } from './moteur/moteur.module';
import { GenerateurModule } from './generateur/generateur.module';
import { PhareModule } from './phare/phare.module';
import { AudioModule } from './audio/audio.module';
import { VehiculeModule } from './vehicule/vehicule.module';


@Module({
  imports: [MoteurModule, GenerateurModule, PhareModule, AudioModule, VehiculeModule],
})
export class AppModule {}
