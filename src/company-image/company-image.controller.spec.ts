import { Test, TestingModule } from '@nestjs/testing';
import { CompanyImageController } from './company-image.controller';
import { CompanyImageService } from './company-image.service';

describe('CompanyImageController', () => {
  let controller: CompanyImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyImageController],
      providers: [CompanyImageService],
    }).compile();

    controller = module.get<CompanyImageController>(CompanyImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
