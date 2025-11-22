import { Injectable } from '@nestjs/common';
import { PhareRepository } from './phare.repository';

@Injectable()
export class PhareService {
  constructor(private repo: PhareRepository) {}

  allumer() {
    return this.repo.turnOn();
  }
}
