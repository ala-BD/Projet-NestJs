import { Test, TestingModule } from '@nestjs/testing';
import { GenerateurService } from './generateur.service';

describe('GenerateurService', () => {
  let service: GenerateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateurService],
    }).compile();

    service = module.get<GenerateurService>(GenerateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
