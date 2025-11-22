import { Injectable } from '@nestjs/common';
import { MoteurRepository } from './moteur.repository';

@Injectable()
export class MoteurService {
  constructor(private repo: MoteurRepository) {}

  demarrer() {
    return this.repo.start();
  }

  statut() {
    return this.repo.getStatus();
  }
}
