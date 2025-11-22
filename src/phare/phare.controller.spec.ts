import { Test, TestingModule } from '@nestjs/testing';
import { PhareController } from './phare.controller';

describe('PhareController', () => {
  let controller: PhareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhareController],
    }).compile();

    controller = module.get<PhareController>(PhareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
