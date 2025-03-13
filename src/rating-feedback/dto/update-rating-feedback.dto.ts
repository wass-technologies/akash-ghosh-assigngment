import { PartialType } from '@nestjs/swagger';
import { CreateRatingFeedbackDto } from './create-rating-feedback.dto';

export class UpdateRatingFeedbackDto extends PartialType(CreateRatingFeedbackDto) {}
