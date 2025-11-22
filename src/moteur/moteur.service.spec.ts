import { Test, TestingModule } from '@nestjs/testing';
import { MoteurService } from './moteur.service';

describe('MoteurService', () => {
  let service: MoteurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoteurService],
    }).compile();

    service = module.get<MoteurService>(MoteurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
