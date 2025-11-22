import { Test, TestingModule } from '@nestjs/testing';
import { MoteurController } from './moteur.controller';

describe('MoteurController', () => {
  let controller: MoteurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoteurController],
    }).compile();

    controller = module.get<MoteurController>(MoteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
