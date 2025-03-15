import { Test, TestingModule } from '@nestjs/testing';
import { CompanySubCategoryController } from './company-sub-category.controller';
import { CompanySubCategoryService } from './company-sub-category.service';

describe('CompanySubCategoryController', () => {
  let controller: CompanySubCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanySubCategoryController],
      providers: [CompanySubCategoryService],
    }).compile();

    controller = module.get<CompanySubCategoryController>(CompanySubCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
