import { Test, TestingModule } from '@nestjs/testing';
import { CompanyCategoryController } from './company-category.controller';
import { CompanyCategoryService } from './company-category.service';

describe('CompanyCategoryController', () => {
  let controller: CompanyCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyCategoryController],
      providers: [CompanyCategoryService],
    }).compile();

    controller = module.get<CompanyCategoryController>(CompanyCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
