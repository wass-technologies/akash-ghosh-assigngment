import { PartialType } from '@nestjs/swagger';
import { CreateCallHistoryDto } from './create-call-history.dto';

export class UpdateCallHistoryDto extends PartialType(CreateCallHistoryDto) {}
