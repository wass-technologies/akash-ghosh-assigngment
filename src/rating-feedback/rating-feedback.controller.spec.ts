import { Test, TestingModule } from '@nestjs/testing';
import { RatingFeedbackController } from './rating-feedback.controller';
import { RatingFeedbackService } from './rating-feedback.service';

describe('RatingFeedbackController', () => {
  let controller: RatingFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingFeedbackController],
      providers: [RatingFeedbackService],
    }).compile();

    controller = module.get<RatingFeedbackController>(RatingFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
