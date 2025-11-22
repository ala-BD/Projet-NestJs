import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio.repository';

@Injectable()
export class AudioService {
  constructor(private repo: AudioRepository) {}

  jouer() {
    return this.repo.playMusic();
  }
}
