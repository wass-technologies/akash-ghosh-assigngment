import { Injectable } from '@nestjs/common';
import { CreateEmailSubscriberDto } from './dto/create-email-subscriber.dto';
import { UpdateEmailSubscriberDto } from './dto/update-email-subscriber.dto';
import { EmailSubscriber } from './entities/email-subscriber.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

@Injectable()
export class EmailSubscribersService {
  constructor(
    @InjectRepository(EmailSubscriber)
    private readonly repo: Repository<EmailSubscriber>,
  ) {}

  async create(dto: CreateEmailSubscriberDto) {
    const obj = Object.create(dto);
    await this.repo.save(obj);
    return { message: 'Subscribed Succesfully' };
  }

  async findAll(dto: CommonPaginationDto) {
    const [result, count] = await this.repo.findAndCount({
      take: dto.limit,
      skip: dto.offset,
    });
    return { result, count };
  }
}
