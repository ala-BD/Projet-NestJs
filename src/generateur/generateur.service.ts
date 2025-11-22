import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from './generateur.repository';

@Injectable()
export class GenerateurService {
  constructor(private repo: GenerateurRepository) {}

  produire() {
    return this.repo.generatePower();
  }
}
