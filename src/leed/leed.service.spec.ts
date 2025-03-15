import { Test, TestingModule } from '@nestjs/testing';
import { LeedService } from './leed.service';

describe('LeedService', () => {
  let service: LeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeedService],
    }).compile();

    service = module.get<LeedService>(LeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
