import { Test, TestingModule } from '@nestjs/testing';
import { RatingFeedbackService } from './rating-feedback.service';

describe('RatingFeedbackService', () => {
  let service: RatingFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatingFeedbackService],
    }).compile();

    service = module.get<RatingFeedbackService>(RatingFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
