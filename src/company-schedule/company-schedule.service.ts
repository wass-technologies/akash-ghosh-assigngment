import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyScheduleDto } from './dto/create-company-schedule.dto';
import { UpdateCompanyScheduleDto } from './dto/update-company-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanySchedule } from './entities/company-schedule.entity';
import { Repository } from 'typeorm';
import { BoolStatusDto } from 'src/common/dto/bool-status.dto';

@Injectable()
export class CompanyScheduleService {
  constructor(
    @InjectRepository(CompanySchedule)
    private readonly repo: Repository<CompanySchedule>,
  ) {}

  async update(id: string, dto: UpdateCompanyScheduleDto) {
    const result = await this.repo.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Schedule not Found');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async status(id: string, dto: BoolStatusDto) {
    const result = await this.repo.findOne({ where: { id: id } });
    if (!result) {
      throw new NotFoundException('Schedule not Found');
    }
    const obj = Object.assign(result, { status: dto.status });
    return this.repo.save(obj);
  }
}
