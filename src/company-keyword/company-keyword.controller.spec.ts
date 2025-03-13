import { Test, TestingModule } from '@nestjs/testing';
import { CompanyKeywordController } from './company-keyword.controller';
import { CompanyKeywordService } from './company-keyword.service';

describe('CompanyKeywordController', () => {
  let controller: CompanyKeywordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyKeywordController],
      providers: [CompanyKeywordService],
    }).compile();

    controller = module.get<CompanyKeywordController>(CompanyKeywordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
