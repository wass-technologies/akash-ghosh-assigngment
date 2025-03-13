import { Test, TestingModule } from '@nestjs/testing';
import { CompanyImageService } from './company-image.service';

describe('CompanyImageService', () => {
  let service: CompanyImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyImageService],
    }).compile();

    service = module.get<CompanyImageService>(CompanyImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
