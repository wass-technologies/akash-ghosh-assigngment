import { Test, TestingModule } from '@nestjs/testing';
import { BannerCategoryController } from './banner-category.controller';
import { BannerCategoryService } from './banner-category.service';

describe('BannerCategoryController', () => {
  let controller: BannerCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BannerCategoryController],
      providers: [BannerCategoryService],
    }).compile();

    controller = module.get<BannerCategoryController>(BannerCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
