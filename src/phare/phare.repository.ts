import { promises as fs } from 'fs';
import { join } from 'path';

const FILE = join(__dirname, '..', 'data', 'phare.json');

export class PhareRepository {
  private async write(data: any) {
    await fs.mkdir(join(__dirname, '..', 'data'), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(data, null, 2));
  }

  async turnOn() {
    await this.write({ on: true });
    return 'Phares allumés';
  }
}
