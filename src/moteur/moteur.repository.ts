import { promises as fs } from 'fs';
import { join } from 'path';

const FILE = join(__dirname, '..', 'data', 'moteur.json');

export class MoteurRepository {
  private async read() {
    try {
      const content = await fs.readFile(FILE, 'utf-8');
      return JSON.parse(content);
    } catch {
      await this.write({ status: 'OFF' });
      return { status: 'OFF' };
    }
  }

  private async write(data: any) {
    await fs.mkdir(join(__dirname, '..', 'data'), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(data, null, 2));
  }

  async start() {
    await this.write({ status: 'ON' });
    return 'Moteur démarré';
  }

  async getStatus() {
    const state = await this.read();
    return state.status;
  }
}
