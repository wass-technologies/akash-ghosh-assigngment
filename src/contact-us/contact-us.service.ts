import { Injectable } from '@nestjs/common';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactUs } from './entities/contact-us.entity';
import { Like, Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUs) private readonly repo: Repository<ContactUs>,
  ) {}

  async create(dto: CreateContactUsDto) {
    const obj = Object.create(dto);
    return this.repo.save(obj);
  }

  async findAll(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';
    const [result, count] = await this.repo.findAndCount({
      take: dto.limit,
      skip: dto.offset,
      where: {
        name: Like('%' + keyword + '%'),
        query: Like('%' + keyword + '%'),
        phoneNumber: Like('%' + keyword + '%'),
        message: Like('%' + keyword + '%'),
      },
    });
    return {result, count};
  }
}
