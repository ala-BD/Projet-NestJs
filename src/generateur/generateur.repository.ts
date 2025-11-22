import { promises as fs } from 'fs';
import { join } from 'path';

const FILE = join(__dirname, '..', 'data', 'generateur.json');

export class GenerateurRepository {
  private async write(data: any) {
    await fs.mkdir(join(__dirname, '..', 'data'), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(data, null, 2));
  }

  async generatePower() {
    const date = new Date().toISOString();
    await this.write({ lastGenerated: date });
    return `Electricité générée à ${date}`;
  }
}
