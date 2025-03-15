import { Test, TestingModule } from '@nestjs/testing';
import { CompanyDetailsController } from './company-details.controller';
import { CompanyDetailsService } from './company-details.service';

describe('CompanyDetailsController', () => {
  let controller: CompanyDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyDetailsController],
      providers: [CompanyDetailsService],
    }).compile();

    controller = module.get<CompanyDetailsController>(CompanyDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
