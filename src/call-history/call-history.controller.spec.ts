import { Test, TestingModule } from '@nestjs/testing';
import { CallHistoryController } from './call-history.controller';
import { CallHistoryService } from './call-history.service';

describe('CallHistoryController', () => {
  let controller: CallHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallHistoryController],
      providers: [CallHistoryService],
    }).compile();

    controller = module.get<CallHistoryController>(CallHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
