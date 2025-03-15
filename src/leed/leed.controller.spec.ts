import { Test, TestingModule } from '@nestjs/testing';
import { LeedController } from './leed.controller';
import { LeedService } from './leed.service';

describe('LeedController', () => {
  let controller: LeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeedController],
      providers: [LeedService],
    }).compile();

    controller = module.get<LeedController>(LeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
