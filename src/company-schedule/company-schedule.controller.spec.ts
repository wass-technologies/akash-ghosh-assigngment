import { Test, TestingModule } from '@nestjs/testing';
import { CompanyScheduleController } from './company-schedule.controller';
import { CompanyScheduleService } from './company-schedule.service';

describe('CompanyScheduleController', () => {
  let controller: CompanyScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyScheduleController],
      providers: [CompanyScheduleService],
    }).compile();

    controller = module.get<CompanyScheduleController>(CompanyScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
