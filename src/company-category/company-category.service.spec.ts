import { Test, TestingModule } from '@nestjs/testing';
import { CompanyCategoryService } from './company-category.service';

describe('CompanyCategoryService', () => {
  let service: CompanyCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyCategoryService],
    }).compile();

    service = module.get<CompanyCategoryService>(CompanyCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
