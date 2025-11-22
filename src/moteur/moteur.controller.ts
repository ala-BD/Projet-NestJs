import { Controller, Get } from '@nestjs/common';
import { MoteurService } from './moteur.service';

@Controller('moteur')
export class MoteurController {
  constructor(private service: MoteurService) {}

  @Get('start')
  start() {
    return this.service.demarrer();
  }

  @Get('status')
  status() {
    return this.service.statut();
  }
}
