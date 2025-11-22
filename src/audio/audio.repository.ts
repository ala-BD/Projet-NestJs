import { promises as fs } from 'fs';
import { join } from 'path';

const FILE = join(__dirname, '..', 'data', 'audio.json');

export class AudioRepository {
  private async write(data: any) {
    await fs.mkdir(join(__dirname, '..', 'data'), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(data, null, 2));
  }

  async playMusic() {
    await this.write({ playing: true });
    return 'Lecture de musique en cours';
  }
}
