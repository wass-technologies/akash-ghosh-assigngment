import { Test, TestingModule } from '@nestjs/testing';
import { CompanyScheduleService } from './company-schedule.service';

describe('CompanyScheduleService', () => {
  let service: CompanyScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyScheduleService],
    }).compile();

    service = module.get<CompanyScheduleService>(CompanyScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
