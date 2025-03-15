import { Test, TestingModule } from '@nestjs/testing';
import { CompanySubCategoryService } from './company-sub-category.service';

describe('CompanySubCategoryService', () => {
  let service: CompanySubCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanySubCategoryService],
    }).compile();

    service = module.get<CompanySubCategoryService>(CompanySubCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
