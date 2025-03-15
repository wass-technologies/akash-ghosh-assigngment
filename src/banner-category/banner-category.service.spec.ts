import { Test, TestingModule } from '@nestjs/testing';
import { BannerCategoryService } from './banner-category.service';

describe('BannerCategoryService', () => {
  let service: BannerCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BannerCategoryService],
    }).compile();

    service = module.get<BannerCategoryService>(BannerCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
