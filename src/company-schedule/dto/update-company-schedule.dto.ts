import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateCompanyScheduleDto {
  @IsNotEmpty()
  time_start: Date;

  @IsNotEmpty()
  time_end: Date;
}
