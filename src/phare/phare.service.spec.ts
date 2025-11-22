import { Test, TestingModule } from '@nestjs/testing';
import { PhareService } from './phare.service';

describe('PhareService', () => {
  let service: PhareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhareService],
    }).compile();

    service = module.get<PhareService>(PhareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
