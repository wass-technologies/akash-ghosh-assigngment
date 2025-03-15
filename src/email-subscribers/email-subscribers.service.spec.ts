import { Test, TestingModule } from '@nestjs/testing';
import { EmailSubscribersService } from './email-subscribers.service';

describe('EmailSubscribersService', () => {
  let service: EmailSubscribersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailSubscribersService],
    }).compile();

    service = module.get<EmailSubscribersService>(EmailSubscribersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
