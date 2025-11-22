import { Module } from '@nestjs/common';
import { MoteurService } from './moteur.service';
import { MoteurController } from './moteur.controller';
import { MoteurRepository } from './moteur.repository';

@Module({
  controllers: [MoteurController],
  providers: [MoteurService, MoteurRepository],
  exports: [MoteurService],
})
export class MoteurModule {}
