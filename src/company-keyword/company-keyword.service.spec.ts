import { Test, TestingModule } from '@nestjs/testing';
import { CompanyKeywordService } from './company-keyword.service';

describe('CompanyKeywordService', () => {
  let service: CompanyKeywordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyKeywordService],
    }).compile();

    service = module.get<CompanyKeywordService>(CompanyKeywordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
