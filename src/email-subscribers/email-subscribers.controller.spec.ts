import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscribersController } from './email-subscribers.controller';
import { EmailSubscribersService } from './email-subscribers.service';

describe('EmailSubscribersController', () => {
  let controller: EmailSubscribersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailSubscribersController],
      providers: [EmailSubscribersService],
    }).compile();

    controller = module.get<EmailSubscribersController>(EmailSubscribersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
