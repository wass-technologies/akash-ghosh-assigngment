import { PartialType } from '@nestjs/swagger';
import { CreateEmailSubscriberDto } from './create-email-subscriber.dto';

export class UpdateEmailSubscriberDto extends PartialType(CreateEmailSubscriberDto) {}
