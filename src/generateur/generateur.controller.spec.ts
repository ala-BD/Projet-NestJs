import { Test, TestingModule } from '@nestjs/testing';
import { GenerateurController } from './generateur.controller';

describe('GenerateurController', () => {
  let controller: GenerateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateurController],
    }).compile();

    controller = module.get<GenerateurController>(GenerateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
